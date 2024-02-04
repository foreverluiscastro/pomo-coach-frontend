// page.js
"use client";
import Login from "@/components/Login";
import NavBar from "@/components/NavBar";
import Settings from "@/components/Settings";
import Timer from "@/components/Timer";
import { useEffect, useState } from "react";

export default function Home() {
  // start with no user logged in
  const [user, setUser] = useState(null);

  // isStudy and session controls the app's color theme
  const [isStudy, setIsStudy] = useState(true);
  const [session, setSession] = useState("Study");

  // do not display the settings until the user clicks settings
  const [showSettings, setShowSettings] = useState(false);

  // do not show login until the user clicks login
  const [showLogin, setShowLogin] = useState(false);

  // default values for time are 25 and 5 but can be customized
  const [studyTime, setStudyTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  // used to customize the study and break times
  const [settingsSaved, setSettingSaved] = useState(false);

  // for the start and pause functionality
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // auto-login
    fetch("http://localhost:3001/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  // SETTINGS
  function handleOpenSettings() {
    setShowSettings(true);
  }

  function handleChangeSettings(newStudyTime, newBreakTime) {
    setStudyTime(newStudyTime);
    setBreakTime(newBreakTime);

    setSettingSaved(true);
    setIsRunning(false);

    handleCloseSettings();
  }

  function handleCloseSettings() {
    setShowSettings(false);
  }

  // LOGIN
  function handleShowLogin() {
    setShowLogin(!showLogin);
  }

  return (
    <div className="App">
      <div className={`Main ${isStudy ? "Study" : "Break"}`}>
        <NavBar
          isStudy={isStudy}
          handleOpenSettings={handleOpenSettings}
          user={user}
          handleShowLogin={handleShowLogin}
        />
        {showSettings && (
          <Settings
            handleChangeSettings={handleChangeSettings}
            handleCloseSettings={handleCloseSettings}
            studyTime={studyTime}
            breakTime={breakTime}
          />
        )}
        {showLogin && (
          <Login handleShowLogin={handleShowLogin} setUser={setUser} />
        )}
        <Timer
          session={session}
          isStudy={isStudy}
          setIsStudy={setIsStudy}
          setSession={setSession}
          studyTime={studyTime}
          breakTime={breakTime}
          settingsSaved={settingsSaved}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
        />
        <footer className="mb-4">Made by Luis Castro.</footer>
      </div>
    </div>
  );
}
