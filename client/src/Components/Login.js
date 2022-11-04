import React, { useState } from "react";
import Error from './Error'
import { Navigate } from 'react-router-dom';
import style from '../StyleSheets/Login.module.css';




export default function Login ({ user, setUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }).then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((data) => setUser(data));
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
            <div className="pop-up-title">Welcome Back</div>
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
                    type="password"
                    id="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  </div>
                  <div className="form-item-div">
                    <button className="submit-button" type="submit">
                      {isLoading ? "Loading..." : "Login"}
                    </button>
                  </div>
                  {errors.map((err) => (
                    <Error key={err}>{err}</Error>
                  ))}
              </form>
              </div>
            <div className="pop-up-text">Need to make an account? </div>
          </div>
          
        </>
      );
}