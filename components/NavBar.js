// NavBar.js
import Image from "next/image";

export default function NavBar({ isStudy, handleOpenSettings }) {
  return (
    <nav className="NavBar">
      <div className="NavContainer">
        <h1 className="Header">
          <Image
            src="/timer.png"
            width={25}
            height={25}
            className="p-1"
            alt="Logo"
          />
          PomoCoach
        </h1>
        <button
          className={`Button Login${isStudy ? "SButton" : "BButton"}`}
          onClick={handleOpenSettings}
        >
          Settings
        </button>
      </div>
    </nav>
  );
};