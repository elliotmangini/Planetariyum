import { useState , useEffect } from 'react';



export default function ProfileEditor ({ user }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sequence , setSequence ] =useState(1);

    function handleProfileUpdate () {

    }

    return (
        <>
            <div className="pop-up-container">
          <div className="pop-up-title">{user.display_name}</div>
          <div className="form-container">
            <form className="form" onSubmit={handleProfileUpdate}>
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
        </>
    )
}