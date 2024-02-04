import { useState } from "react";

// Settings.js
export default function Settings({
  handleCloseSettings,
  handleChangeSettings,
  studyTime,
  breakTime,
}) {
  const [formStudyTime, setFormStudyTime] = useState(studyTime)
  const [formBreakTime, setFormBreakTime] = useState(breakTime)


  function handleSubmit(e) {
    e.preventDefault();

    handleChangeSettings(parseInt(formStudyTime), parseInt(formBreakTime));
  }

  return (
    <div className="ModalBackground">
      <div className="Modal">
        <div className="flex items-center justify-between mb-4 w-full shadow-md p-4">
          <h1 className="text-lg font-bold mx-auto">Settings</h1>
          <button className="SettingsButton" onClick={handleCloseSettings}>
            Close
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full p-4 text-center"
        >
          <div className="mb-4 flex items-center">
            <label className="Label">Study Time:</label>
            <input
              className="Input"
              value={formStudyTime}
              onChange={(e) => setFormStudyTime(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="Label">Break Time:</label>
            <input
              className="Input"
              value={formBreakTime}
              onChange={(e) => setFormBreakTime(e.target.value)}
            />
          </div>
          <button type="submit" className="SettingsButton">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
