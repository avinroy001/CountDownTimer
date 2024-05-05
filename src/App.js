
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [selectedDate, setSelectedDate] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [sec, setSec] = useState(0);
  const [error, setError] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const[over,setOver]=useState(false);

  useEffect(() => {
    let interval;

    if (isRunning && selectedDate) {
      const calculateTime = () => {
        const time = selectedDate - Date.now();
        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        if (days <= 99) {
          if(time>0){
            setHours(Math.floor(time / (1000 * 60 * 60) % 24));
            setMins(Math.floor((time / 1000 / 60) % 60));
            setSec(Math.floor((time / 1000) % 60));
          }else{
            clearInterval(interval);
            setDays(0);
            setOver(true);
          }
          
        } else {
          setIsRunning(false);
          clearInterval(interval);
          setError(true);
        }
      };

      interval = setInterval(calculateTime, 1000);
      calculateTime();
    }

    return () => clearInterval(interval);
  }, [selectedDate, isRunning, days]); 
  const handleClick = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="wrapper">
      <div className="heading">
        <h1>
          <span className="heading1">Countdown</span>{" "}
          <span className="heading2">Timer</span>
        </h1>
      </div>

      <input
        type="datetime-local"
        id="meeting-time"
        onChange={(e) => setSelectedDate(Date.parse(e.target.value))}
      />

      <div className="btn">
        <button onClick={handleClick}>
          {isRunning ? "Cancel Timer" : "Start Timer"}
        </button>
      </div>
      {over?(<p className="end">The Countdown is over! What's next on your adventure?</p>):error ? (
        <h3>Selected time is more than 100 days</h3>
      ) : (
        <div className="display">
          <div className="displaybox">
            <p>{days}</p>
            <p>Days</p>
          </div>
          <div className="displaybox">
            <p>{hours}</p>
            <p>Hours</p>
          </div>
          <div className="displaybox">
            <p>{mins}</p>
            <p>Minutes</p>
          </div>
          <div className="displaybox">
            <p>{sec}</p>
            <p>Seconds</p>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default App;
