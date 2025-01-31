function Login() {
  return (
    <div className="container">
      <h1>Login</h1>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            required
          />
        </div>
      </form>
    </div>
  );
}

export default Login;
