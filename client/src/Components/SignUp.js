import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import AvatarUpload from './AvatarUpload';


export default function SignUp ({ user, setUser }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        // set_theme: theme,
        password_confirmation: passwordConfirmation,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => setUser(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <>
        {/* FORWARD PATH */}
        { user ? <Navigate to="/" /> : null}
        
        <div className="pop-up-container">
          <div className="pop-up-title">Create An Account</div>
          <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-item-div">
                <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-item-div">
                <input
                type="text"
                id="email"
                placeholder="e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-item-div">
                <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                />
              </div>
              
              <div className="form-item-div">
                <input
                type="password"
                id="password_confirmation"
                placeholder="Confirm Password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                autoComplete="current-password"
                />
              </div>

              <div className="form-item-div">
                <button className="submit-button" type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>
              </div>
              <div className="validation-errors">
                {errors.map((err) => (
                  <p key={err}>{err}</p>
                ))}
              </div>
            </form>
          </div>
        </div>

        <AvatarUpload user={user} setUser={setUser}/>
    </>
  );
}