const bells = new Audio('bell.wav'); 
const click = new Audio('click.wav');
const startBtn = document.querySelector('.btn-start'); 
const sessionMin = document.querySelector('.minutes');
const sessionSec = document.querySelector('.seconds'); 
let myInterval; 
let state = true;
let toggle=0;

function appTimer(){
  if(state){
    state=false;
    let totalSeconds=((Number.parseInt(sessionMin.textContent))*60)+Number.parseInt(sessionSec.textContent);
    const updateSeconds=()=>{
      totalSeconds--;
      const minute=document.querySelector('.minutes');
      const second=document.querySelector('.seconds');

      const minutesLeft=Math.floor(totalSeconds/60);
      const secondsLeft=totalSeconds%60;

      if(secondsLeft<10){
        second.textContent='0'+secondsLeft;
      }
      else{
        second.textContent=secondsLeft;
      }
      if(minutesLeft<10){
        minute.textContent='0'+minutesLeft;
      }
      else{
        minute.textContent=minutesLeft;
      }

      if(minutesLeft===0 && secondsLeft===0){
        if(document.body.classList.contains('short')||document.body.classList.contains('long')){
          sessionMin.textContent='25';
          sessionSec.textContent='00';
          document.body.classList.remove('short');
          document.body.classList.remove('long');
          document.querySelector('.focus').classList.add('button-active');
          document.querySelector('.short-break').classList.remove('button-active');
          document.querySelector('.long-break').classList.remove('button-active');
          clearInterval(myInterval);
          state=true;
          startBtn.textContent='START';
          bells.play();
          alert('Time to focus!');
        }
        else{
          bells.play();
          clearInterval(myInterval);
          sessionMin.textContent='25';
          sessionSec.textContent='00';
        }
      }
    }
    myInterval=setInterval(updateSeconds,1000);
  }
  else{
    alert('The session has already started.');
  }
}

startBtn.addEventListener('click',()=>{
  if(!toggle){
    click.play();
    appTimer();
    toggle=1;
    startBtn.textContent='PAUSE';
  }
  else{
    toggle=0;
    state=true;
    click.play();
    clearInterval(myInterval);
    startBtn.textContent='START';
  }
});

document.querySelector('.focus').addEventListener('click',()=>{
  sessionMin.textContent='25';
  sessionSec.textContent='00';
  document.body.classList.remove('short');
  document.body.classList.remove('long');
  document.querySelector('.focus').classList.add('button-active');
  document.querySelector('.short-break').classList.remove('button-active');
  document.querySelector('.long-break').classList.remove('button-active');
  clearInterval(myInterval);
  state=true;
  startBtn.textContent='START';
});

document.querySelector('.short-break').addEventListener('click',()=>{
  sessionMin.textContent='05';
  sessionSec.textContent='00';
  document.body.classList.add('short');
  document.body.classList.remove('long');
  document.querySelector('.short-break').classList.add('button-active');
  document.querySelector('.focus').classList.remove('button-active');
  document.querySelector('.long-break').classList.remove('button-active');
  state=true;
  clearInterval(myInterval);
  startBtn.textContent='START';
});

document.querySelector('.long-break').addEventListener('click',()=>{
  sessionMin.textContent='15';
  sessionSec.textContent='00';
  document.body.classList.add('long');
  document.body.classList.remove('short');
  document.querySelector('.long-break').classList.add('button-active');
  document.querySelector('.focus').classList.remove('button-active');
  document.querySelector('.short-break').classList.remove('button-active');
  state=true;
  clearInterval(myInterval);
  startBtn.textContent='START';
});