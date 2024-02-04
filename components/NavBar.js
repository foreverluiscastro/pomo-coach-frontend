// NavBar.js
import Image from "next/image";

export default function NavBar({ isStudy, handleOpenSettings , user , handleShowLogin}) {
  return (
    <nav className="NavBar">
      <div className="NavContainer">
        <div>
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
        </div>
        <div className="flex space-x-4">
        <button
          className={`Button Login${isStudy ? "SButton" : "BButton"}`}
          onClick={handleOpenSettings}
        >
          Settings
        </button>
        {!user ? <button className={`Button Login${isStudy ? "SButton" : "BButton"}`} onClick={handleShowLogin}>Login</button> : <button className={`Button Login${isStudy ? "SButton" : "BButton"}`}>Hello {user.username}</button>}
        </div>
      </div>
    </nav>
  );
};