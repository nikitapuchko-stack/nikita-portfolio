import { spawn } from 'node:child_process';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
import net from 'node:net';
import { randomBytes } from 'node:crypto';

class CDPSocket extends EventTarget {
  constructor(address) {
    super();
    const url=new URL(address);
    this.connection=net.createConnection({host:url.hostname,port:Number(url.port)});
    let buffer=Buffer.alloc(0), upgraded=false;
    this.connection.on('connect',()=>this.connection.write(`GET ${url.pathname} HTTP/1.1\r\nHost: ${url.host}\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: ${randomBytes(16).toString('base64')}\r\nSec-WebSocket-Version: 13\r\n\r\n`));
    this.connection.on('data',data=>{
      buffer=Buffer.concat([buffer,data]);
      if(!upgraded){const end=buffer.indexOf('\r\n\r\n');if(end<0)return;assert.ok(buffer.subarray(0,end).toString().includes('101'));buffer=buffer.subarray(end+4);upgraded=true;this.dispatchEvent(new Event('open'));}
      while(buffer.length>=2){let length=buffer[1]&127,offset=2;if(length===126){if(buffer.length<4)return;length=buffer.readUInt16BE(2);offset=4;}else if(length===127){if(buffer.length<10)return;length=Number(buffer.readBigUInt64BE(2));offset=10;}if(buffer.length<offset+length)return;const opcode=buffer[0]&15;const payload=buffer.subarray(offset,offset+length);buffer=buffer.subarray(offset+length);if(opcode===1){const event=new Event('message');event.data=payload.toString();this.dispatchEvent(event);}}
    });
  }
  send(value){const data=Buffer.from(value),mask=randomBytes(4);let header;if(data.length<126){header=Buffer.from([0x81,0x80|data.length]);}else{header=Buffer.alloc(4);header[0]=0x81;header[1]=0xfe;header.writeUInt16BE(data.length,2);}const masked=Buffer.from(data);for(let i=0;i<masked.length;i++)masked[i]^=mask[i%4];this.connection.write(Buffer.concat([header,mask,masked]));}
  close(){this.connection.destroy();}
}

const wait = ms => new Promise(r => setTimeout(r, ms));
const keepAlive = setInterval(() => {}, 1000);
const profile = resolve(`node_modules/.cache/chrome-touch-profile-${Date.now()}`);
await mkdir(profile, {recursive:true});
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--disable-gpu', '--no-sandbox', '--remote-debugging-port=0', `--user-data-dir=${profile}`,
  '--no-first-run', '--no-default-browser-check', 'about:blank',
], {windowsHide:true, stdio:['ignore','ignore','pipe']});
chrome.stderr.on('data', data=>process.stderr.write(data));
let socket;
try {
  let port;
  for (let i=0;i<100;i++) {
    try {port = (await readFile(resolve(profile,'DevToolsActivePort'),'utf8')).split('\n')[0]; break;} catch {await wait(100);}
  }
  assert.ok(port,'Chrome debugging started');
  const target = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, {method:'PUT'})).json();
  socket = new WebSocket(target.webSocketDebuggerUrl);
  socket.addEventListener('close', event => console.log('CDP closed',event.code,event.reason));
  socket.addEventListener('error', event => console.log('CDP error',event.message));
  await new Promise(r => socket.addEventListener('open',r,{once:true}));
  let id=0;
  const pending = new Map();
  socket.addEventListener('message',event => {
    const response = JSON.parse(event.data);
    if (!response.id) return;
    const task = pending.get(response.id);
    pending.delete(response.id);
    response.error ? task.reject(new Error(JSON.stringify(response.error))) : task.resolve(response.result);
  });
  const send = (method,params={}) => new Promise((resolve,reject)=>{
    if(method !== 'Runtime.evaluate') console.log(method);
    const timeout=setTimeout(()=>reject(new Error(`Timed out: ${method}`)),30000);
    const done=value=>{clearTimeout(timeout);resolve(value);};
    const key=++id; pending.set(key,{resolve:done,reject}); socket.send(JSON.stringify({id:key,method,params}));
  });
  const evaluate = async expression => {
    const result=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
    if(result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  await send('Emulation.setDeviceMetricsOverride',{width:414,height:896,deviceScaleFactor:2,mobile:true});
  await send('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:5});
  await send('Emulation.setUserAgentOverride',{userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1'});
  await send('Page.navigate',{url:'http://localhost:4321/nikita-portfolio/'});
  for(let i=0;i<150;i++) {if(await evaluate(`!!document.querySelector('.intro-view.is-ready')`))break;await wait(200);}
  assert.ok(await evaluate(`!!document.querySelector('.intro-view.is-ready')`),'intro loaded');
  const touch = (type,x,y) => send('Input.dispatchTouchEvent',{type,touchPoints:type==='touchEnd'||type==='touchCancel'?[]:[{x,y,radiusX:8,radiusY:8,force:1,id:1}]});
  const palette = () => evaluate(`(()=>{const v=document.querySelector('.intro-view');return {view:getComputedStyle(v).backgroundColor,body:getComputedStyle(document.body).backgroundColor,html:getComputedStyle(document.documentElement).backgroundColor,meta:document.querySelector('meta[name="theme-color"]')?.content,edges:[...document.querySelectorAll('.intro-browser-edge')].map(e=>({color:getComputedStyle(e).backgroundColor,display:getComputedStyle(e).display})),position:v.dataset.carouselPosition}})()`);
  const paletteResults=[];
  await wait(650);
  for(let i=0;i<4;i++) {
    const colors=await palette();
    assert.equal(colors.view,colors.body);assert.equal(colors.view,colors.html);assert.equal(colors.view,colors.meta);
    colors.edges.forEach(edge=>{assert.equal(edge.display,'block');assert.equal(edge.color,colors.view);});
    paletteResults.push(colors);
    await touch('touchStart',207,590);
    for(let j=1;j<=10;j++){await touch('touchMove',207,590-j*24);await wait(20);}
    await touch('touchEnd');await wait(900);
  }
  assert.ok(new Set(paletteResults.map(p=>p.view)).size>1,'swipes change browser tint repeatedly');
  await send('Page.captureScreenshot',{format:'png'}).then(result=>writeFile('.tmp/mobile-intro.png',Buffer.from(result.data,'base64')));
  const point = async selector => evaluate(`(()=>{const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`);
  const enter=await point('.intro-enter');await touch('touchStart',enter.x,enter.y);await touch('touchEnd');await wait(700);
  assert.equal(await evaluate(`document.querySelector('.intro-view').hidden`),true);
  assert.ok(await evaluate(`[...document.querySelectorAll('.intro-browser-edge')].every(e=>getComputedStyle(e).display==='none')`));
  const buttonSelector='[data-nav="contacts"]';
  const p=await point(buttonSelector);
  const buttonState = () => evaluate(`(()=>{const e=document.querySelector('${buttonSelector}');const s=getComputedStyle(e);return {pressed:e.classList.contains('is-pressed'),returning:e.classList.contains('is-returning'),transform:s.transform,shadow:s.boxShadow,color:getComputedStyle(e.querySelector('.nav-mobile-icon')).color,active:[...document.querySelectorAll('.nav-link.is-active')].map(e=>e.dataset.nav)}})()`);
  await touch('touchStart',p.x,p.y);await wait(140);
  const held=await buttonState();
  assert.equal(held.pressed,true);assert.notEqual(held.transform,'none');assert.ok(held.shadow.includes('inset'));assert.equal(held.color,'rgb(136, 136, 136)');
  await send('Page.captureScreenshot',{format:'png'}).then(result=>writeFile('.tmp/mobile-button-pressed.png',Buffer.from(result.data,'base64')));
  await touch('touchEnd');await wait(35);
  const returning=await buttonState();assert.equal(returning.color,'rgb(136, 136, 136)');
  await wait(170);
  const raised=await buttonState();assert.equal(raised.pressed,false);assert.equal(raised.returning,false);assert.equal(raised.color,'rgb(0, 140, 255)');
  await wait(1000);
  const about=await point('[data-nav="about"]');
  await touch('touchStart',about.x,about.y);await wait(10);await touch('touchEnd');await wait(50);
  assert.equal(await evaluate(`document.querySelector('[data-nav="about"]').classList.contains('is-pressed')`),true,'short tap still visibly depresses');
  await wait(200);
  assert.equal(await evaluate(`getComputedStyle(document.querySelector('[data-nav="about"] .nav-mobile-icon')).color`),'rgb(0, 140, 255)');
  await wait(900);
  await send('Page.captureScreenshot',{format:'png'}).then(result=>writeFile('.tmp/mobile-button-raised.png',Buffer.from(result.data,'base64')));
  console.log(JSON.stringify({paletteResults,held,returning,raised,shortTap:'passed'},null,2));
} finally {clearInterval(keepAlive);socket?.close();chrome.kill();}
