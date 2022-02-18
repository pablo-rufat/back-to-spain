import React, { useState, useEffect } from "react";

const parseInterval = (interval) => {
  switch(interval) {
    case 'days':
      return 'dias';
    case 'day':
      return 'dia';
    case 'months':
      return 'meses';
    case 'month':
      return 'mes';
    case 'hours':
      return 'horas';
    case 'hour':
      return 'hora';
    case 'minutes':
      return 'minutos';
    case 'minuto':
      return 'minuto';
    case 'seconds':
      return 'segundos';
    case 'second':
      return 'segundo';
    default:
      return 'tomate';
  }
}; 

const calculateTimeLeft = () => {
  const finalDate = new Date(2022, 2, 20, 5, 10, 0, 0);
  const difference = ( finalDate - new Date());

  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  return timeLeft;
};

function App() {

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }
  
    timerComponents.push(
      <span>
        {timeLeft[interval]} {parseInterval(interval)}{" "}
      </span>
    );
  });

  if (!timerComponents[3]) timerComponents[3] = <span> {0} segundos {" "} </span>

  return (
    <div id="background" class="d-flex flex-column align-items-center justify-content-center">
      <h1 id="title" class="d-flex">CUENTA ATRÁS PARA LA VUELTA A ESPAÑA!</h1>
      <div id="timer" class="flex-wrap d-flex justify-content-center">
        <div id="days" class="align-items-center flex-column d-flex justify-content-center">
          { timerComponents[0] }
        </div>
        <div id="hours" class="align-items-center flex-column d-flex justify-content-center">
          { timerComponents[1] }
        </div>
        <div id="minutes" class="align-items-center flex-column d-flex justify-content-center">
          { timerComponents[2] }
        </div>
        <div id="seconds" class="align-items-center flex-column d-flex justify-content-center">
          { timerComponents[3] }
        </div>
      </div>
    </div>
  );
}

export default App;
