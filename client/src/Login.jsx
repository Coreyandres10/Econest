import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Login.css'; 

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3001/register', {email, password});
          console.log(response);
          navigate("/home");
        } catch (error) {
          console.error(error);
        }
      };

    // Otherwise, render the login form
    return (
        <div className="login-container">
            <div className="login-background"></div>
            <div className="login-content">
                <h2 className="login-title">Welcome to Econest</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success btn-block">
                        Login
                    </button>
                </form>
                <p className="login-signup">Don't have an Account? <Link to="/register">Sign Up</Link></p>
            </div>
        </div>
    );
}

export default Login;
