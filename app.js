'use strict';
const menu=document.querySelector('.menu'),nav=document.querySelector('nav');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('open',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
document.getElementById('year').textContent=new Date().getFullYear();
document.getElementById('inquiry').addEventListener('submit',e=>{e.preventDefault();const d=new FormData(e.currentTarget);const subject='Lloyd Group project inquiry: '+d.get('service');const body='Name: '+d.get('name')+'\nEmail: '+d.get('email')+'\nProject: '+d.get('service')+'\n\n'+d.get('message');window.location.href='mailto:support@lloydgrp.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);document.getElementById('form-status').textContent='Your email app should open. Review and send your message.'});
const canvas=document.getElementById('network'),motion=document.getElementById('motion');
let paused=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function sync(){motion.textContent=paused?'Play motion':'Pause motion';motion.setAttribute('aria-pressed',String(paused))}
motion.addEventListener('click',()=>{paused=!paused;sync()});sync();
if(window.THREE){
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(38,1,.1,100),renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
 renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.outputColorSpace=THREE.SRGBColorSpace;
 camera.position.z=4.25;
 const globe=new THREE.Group();scene.add(globe);
 const loader=new THREE.TextureLoader();
 const earth=loader.load('earth.jpg',()=>renderer.render(scene,camera));
 earth.colorSpace=THREE.SRGBColorSpace;
 const material=new THREE.MeshPhongMaterial({map:earth,shininess:8,specular:new THREE.Color('#3b5360')});
 const sphere=new THREE.Mesh(new THREE.SphereGeometry(1.37,96,64),material);globe.add(sphere);
 const clouds=loader.load('earth-clouds.png',()=>renderer.render(scene,camera));
 const cloudMesh=new THREE.Mesh(new THREE.SphereGeometry(1.383,96,64),new THREE.MeshPhongMaterial({map:clouds,transparent:true,opacity:.22,depthWrite:false}));globe.add(cloudMesh);
 const glow=new THREE.Mesh(new THREE.SphereGeometry(1.43,64,48),new THREE.MeshBasicMaterial({color:0x5da5cc,transparent:true,opacity:.075,side:THREE.BackSide}));globe.add(glow);
 scene.add(new THREE.AmbientLight(0x9bb7d0,1.1));
 const sun=new THREE.DirectionalLight(0xffffff,2.5);sun.position.set(-3,2.4,5);scene.add(sun);
 const rim=new THREE.DirectionalLight(0x78a5ff,.8);rim.position.set(4,-1,-3);scene.add(rim);
 globe.rotation.z=.16;globe.rotation.y=-.45;
 function resize(){const r=canvas.getBoundingClientRect();if(!r.width||!r.height)return;renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix()}
 new ResizeObserver(resize).observe(canvas);resize();
 let last=0;function frame(t){requestAnimationFrame(frame);if(!paused&&!document.hidden){const dt=Math.min((t-last)/1000,.06);if(last)globe.rotation.y+=dt*.16;cloudMesh.rotation.y+=dt*.012}last=t;renderer.render(scene,camera)}requestAnimationFrame(frame);
}else{canvas.style.background='radial-gradient(circle,#234b62,#0a181d 55%,transparent 70%)'}
