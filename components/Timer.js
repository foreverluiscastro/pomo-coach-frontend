// Timer.js
import React, { useState, useEffect } from "react";

export default function Timer({
  session,
  isStudy,
  setSession,
  setIsStudy,
  studyTime,
  breakTime,
  settingsSaved,
}) {
  // for the start abd pause functionality
  const [isRunning, setIsRunning] = useState(false);

  // time stores the total seconds on the clock
  const [time, setTime] = useState(isStudy ? studyTime * 60 : breakTime * 60); // 25 minutes in total seconds


  // This useEffect runs the timer if it is running
  useEffect(() => {
    let timerInterval;
    // before anything check if time reached zero
    if (time === -1) {
      // check if notifications are on and send a notification
      setIsRunning(false);
      if (Notification.permission === "granted") {
        displayNotification()
        console.log("Browser times up")
      }

      if (session === "Study") {
        // refill the time for 25 mins
        setTime(1500);
      } else {
        // refill the time for 5 mins
        setTime(300);
      }
    }

    if (isRunning) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    const displayMessage = isStudy ? "to study" : "for a break";

    document.title = `${formatTime()} Time ${displayMessage}!`;

    return () => clearInterval(timerInterval);
  }, [time, isRunning, session, studyTime, breakTime]);
  

  // for custom study and break times
  useEffect(() => {
    // Update time only if settings have been saved
    if (settingsSaved) {
      setTime(session === "Study" ? studyTime * 60 : breakTime * 60);
    }
  }, [session, studyTime, breakTime, settingsSaved]);

  // if notifications are on let em know the timers done
  function displayNotification() {

    if ("Notification" in window) {
      // Your code for notifications
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          alert("Time's up!")
        }
      })
    }
  }

  function formatTime() {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");

    return `${minutes}:${seconds}`;
  }

  const buttonsToDisplay = ["Study", "Break"].map((option) => {
    const buttonClass = `Button ${option}Button${
      option === session ? "Selected" : ""
    }`;

    return (
      <button
        className={buttonClass}
        onClick={handleClick}
        value={option}
        key={option}
      >
        {option}
      </button>
    );
  });

  function handleClick(e) {
    setSession(e.target.value);

    if (isStudy === false) {
      setIsStudy(true);
      setIsRunning(false);
      setTime(1500);
    } else {
      setIsStudy(false);
      setIsRunning(false);
      setTime(300);
    }
  }

  function handleConfirm() {
    // add browser notifications for multi-tabs
    Notification.requestPermission().then(() => {
      if (!isRunning) {
        setIsRunning(true);
      } else {
        setIsRunning(false);
      }
    });
  }

  return (
    <div className="Timer">
      <div
        className={`TimerContainer ${
          isStudy ? "StudyContainer" : "BreakContainer"
        }`}
      >
        <div className="ButtonContainer">{buttonsToDisplay}</div>
        <div className="Time">{formatTime()}</div>
        <button
          className={isStudy ? "StudyStartButton" : "BreakStartButton"}
          onClick={handleConfirm}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
      </div>
    </div>
  );
}
