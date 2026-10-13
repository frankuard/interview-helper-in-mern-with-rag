import { useNavigate, Link } from "react-router";
import "../auth.form.scss"


const Register = () => {

    const handleSubmit = (e) => {
    e.preventDefault();
}
    const navigate = useNavigate()

    
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>

             <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" placeholder="Enter a Username" />
          </div>
          
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Enter your Email Address" />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder="Enter your Password" />
          </div>

          <button className="button primary-button">Register</button>

        </form>

        <p className="auth-footer">Already have an account? <Link to={"/login"}>Login</Link></p>
      </div>
    </main>
  )
}

export default Register