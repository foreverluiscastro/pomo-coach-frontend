// Settings.js
export default function Settings({
  handleCloseSettings,
  handleChangeSettings,
  studyTime,
  breakTime,
  setBreakTime,
  setStudyTime,
}) {
  function handleSubmit(e) {
    e.preventDefault();

    handleChangeSettings(parseInt(studyTime), parseInt(breakTime));
  }

  return (
    <div className="Settings">
      <div className="SettingsContainer">
        <div className="flex items-center justify-between mb-4 w-full shadow-md p-4">
          <h1 className="text-lg font-bold mx-auto">Settings</h1>
          <button className="SettingsButton" onClick={handleCloseSettings}>
            Close
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm p-4 text-center"
        >
          <div className="mb-4 flex items-center">
            <label className="Label">Study Time:</label>
            <input
              className="Input"
              value={studyTime}
              onChange={(e) => setStudyTime(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center">
            <label className="Label">Break Time:</label>
            <input
              className="Input"
              value={breakTime}
              onChange={(e) => setBreakTime(e.target.value)}
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
