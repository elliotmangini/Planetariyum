import { useState } from 'react';



export default function SignUp1 ({ user, setUser, setSequence }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

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
            display_name: username,
            username: username.replace(/\s/g, ""),
            email: email,
            password: password,
            site_theme: "dark",
            password_confirmation: passwordConfirmation,
          }),
        }).then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((user) => {
                setSequence(2);
                setUser(user);
            });
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
    }

    return (
        <>
            <div id="lazy-first-signup-page" className="pop-up-container">
                <div className="pop-up-title">Create Account</div>
                    <div className="form-container">
                        <form className="form" onSubmit={handleSubmit}>
                        <div className="form-item-div">
                            <input
                            type="text"
                            id="Display Name"
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