import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

export default function Login({ handleShowLogin, setUser }) {
  const [login, setLogin] = useState("Login");

  const buttonsToDisplay = ["Login", "SignUp"].map((option) => {
    const buttonClass = `Button LoginButton${
      option === login ? "Selected" : ""
    }`;

    return (
      <button
        className={buttonClass}
        onClick={() => setLogin(option)}
        value={option}
        key={option}
      >
        {option}
      </button>
    );
  });

  return (
    <div className="ModalBackground">
      <div className="Modal">
        <div className="flex items-center justify-between mb-4 w-full shadow-md p-4">
          {buttonsToDisplay}
          <button className="SettingsButton" onClick={handleShowLogin}>
            Close
          </button>
        </div>
        {login === "Login" ? (
          <LoginForm setUser={setUser} />
        ) : (
          <SignUpForm setUser={setUser} />
        )}
      </div>
    </div>
  );
}
