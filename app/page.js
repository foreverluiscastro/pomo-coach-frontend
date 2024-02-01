// page.js
"use client";
import NavBar from "@/components/NavBar";
import Settings from "@/components/Settings";
import Timer from "@/components/Timer";
import { useState } from "react";

export default function Home() {
  // isStudy and session controls the app's color theme
  const [isStudy, setIsStudy] = useState(true);
  const [session, setSession] = useState("Study");

  // do not display the settings until the user clicks settings
  const [showSettings, setShowSettings] = useState(false);

  // default values for time are 25 and 5 but can be customized
  const [studyTime, setStudyTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  // used to customize the study and break times
  const [settingsSaved, setSettingSaved] = useState(false);

  function handleOpenSettings() {
    setShowSettings(true);
  }

  function handleChangeSettings(newStudyTime, newBreakTime) {
    setStudyTime(newStudyTime);
    setBreakTime(newBreakTime);

    setSettingSaved(true);

    handleCloseSettings();
  }

  function handleCloseSettings() {
    setShowSettings(false);
  }

  return (
    <div className="App">
      <div className={`Main ${isStudy ? "Study" : "Break"}`}>
        <NavBar isStudy={isStudy} handleOpenSettings={handleOpenSettings} />
        {showSettings && (
          <Settings
            handleChangeSettings={handleChangeSettings}
            handleCloseSettings={handleCloseSettings}
            studyTime={studyTime}
            breakTime={breakTime}
            setBreakTime={setBreakTime}
            setStudyTime={setStudyTime}
          />
        )}
        <Timer
          session={session}
          isStudy={isStudy}
          setIsStudy={setIsStudy}
          setSession={setSession}
          studyTime={studyTime}
          breakTime={breakTime}
          settingsSaved={settingsSaved}
        />
        <footer className="mb-4">Made by Luis Castro.</footer>
      </div>
    </div>
  );
}
