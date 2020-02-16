var team1_timer = 00;
window.onload = function () {


  var seconds = 00; 
  var tens    = 00; 
  var appendTens    = document.getElementById("tens")
  var appendSeconds = document.getElementById("seconds")
  var buttonStart   = document.getElementById('button-start');
  var buttonStop    = document.getElementById('button-stop');
  var buttonReset   = document.getElementById('button-reset');
  var Interval;

  buttonStart.onclick = function() {
     clearInterval(Interval);
     Interval = setInterval(startTimer, 10);
  }
  
  buttonStop.onclick = function() {
       clearInterval(Interval);
  }
  
  buttonReset.onclick = function() {
     clearInterval(Interval);
    tens = "00";
    seconds = "00";
    appendTens.innerHTML = tens;
    appendSeconds.innerHTML = seconds;
  }
  
  function startTimer () {
    tens++; 
    
    if(tens < 9){
      appendTens.innerHTML = "0" + tens;
    }
    
    if (tens > 9){
      appendTens.innerHTML = tens;
      
    } 
    
    if (tens > 99) {
      console.log("seconds");
      seconds++;
      team1_timer = seconds;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }
    
    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }
    team1_timer = seconds;
  }

  ///////////////////////////////////////////

  var seconds_hold = 00; 
  var tens_hold = 00; 
  var appendTens_hold = document.getElementById("tens_hold")
  var appendSeconds_hold = document.getElementById("seconds_hold")
  var buttonStart_hold = document.getElementById('button-start_hold');
  var buttonStop_hold = document.getElementById('button-stop_hold');
  var buttonReset_hold = document.getElementById('button-reset_hold');
  var Interval_hold ;

  buttonStart_hold.onclick = function() {
     clearInterval(Interval_hold);
     Interval_hold = setInterval(startTimer_hold, 10);
  }
  
  buttonStop_hold.onclick = function() {
     clearInterval(Interval_hold);
  }
  
  buttonReset_hold.onclick = function() {
    clearInterval(Interval_hold);
    tens_hold = "00";
    seconds_hold = "00";
    appendTens_hold.innerHTML = tens_hold;
    appendSeconds_hold.innerHTML = seconds_hold;
  }
  
  function startTimer_hold () {
    tens_hold++; 
    
    if(tens_hold < 9){
      appendTens_hold.innerHTML = "0" + tens_hold;
    }
    
    if (tens_hold > 9){
      appendTens_hold.innerHTML = tens_hold;
      
    } 
    
    if (tens_hold > 99) {
      console.log("seconds_hold");
      seconds_hold++;
      appendSeconds_hold.innerHTML = "0" + seconds_hold;
      tens_hold = 0;
      appendTens_hold.innerHTML = "0" + 0;
    }
    
    if (seconds_hold > 9){
      appendSeconds_hold.innerHTML = seconds_hold;
    }
  }
}