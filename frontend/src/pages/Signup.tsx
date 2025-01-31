import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../utils";

function Signup() {
  const initialState = {
    name: "",
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

  const handleSignup = async (event: any) => {
    event.preventDefault();
    const { name, email, password } = info;
    if (!name || !email || !password) {
      return handleError("All fields are required");
    }

    try {
      const url = "http://localhost:3000/auth/register";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });

      const result = await response.json();
      if (!result) {
        handleError("Failed to sign up");
      }

      const { success, message,error } = result;
      if (!success) {
        return handleError(`${error.details}`);
      }

      setInfo(initialState);
      handleSuccess(`${message}`);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      handleError(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            autoFocus
            placeholder="Enter your name"
            value={info.name}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="email"
            name="email"
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

        <button type="submit">Sign Up</button>
        <span>
          Already have an account?
          <Link to="/login">Login</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
