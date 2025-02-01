import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../utils";

function Login() {
  const initialState = {
    email: "",
    password: "",
  };
  
  const [info, setInfo] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();
    const { email, password } = info;
    if (!email || !password) {
      return handleError("All fields are required");
    }

    try {
      const url = "https://frontend-auth-lime.vercel.app/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });

      const result = await response.json();
      const { success, message, jwtToken, name } = result;

      if (!success) {
        return handleError(message);
      }

      setInfo(initialState);
      handleSuccess(message);

      localStorage.setItem("token", jwtToken);
      localStorage.setItem("loggedInUser", name);

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error: any) {
      handleError(error.message);
    }
  };
  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
            autoFocus
            placeholder="Enter email"
            value={info.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Enter password"
            value={info.password}
          />
        </div>
        <button type="submit">Log In</button>
        <span>
          Don't have an account?
          <Link to="/signup">Sign Up</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
