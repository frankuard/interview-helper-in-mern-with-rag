import { Link, useNavigate } from "react-router";
import "../auth.form.scss"


const Login = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const navigate = useNavigate()

  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Enter your Email Address" />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder="Enter your Password" />
          </div>

          <button className="button primary-button">Login</button>

        </form>

        <p className="auth-footer">Dont have an account? <Link to={"/register"}>Register</Link></p>

      </div>
    </main>
  )
}

export default Login