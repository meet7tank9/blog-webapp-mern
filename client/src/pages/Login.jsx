import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })
  const changeInputHandle = (e) => {
    setUserData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }
  return (
    <section className="login">
      <div className="container">
        <h2>Sign In</h2>
        <form action="" className="form login_form">
          <p className="form_error-message">This is an error message</p>
          <input type="email" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandle} autoFocus />
          <input type="password" placeholder='Password' name='password' value={userData.password} onChange={changeInputHandle} />
          <button type='submit' className='btn primary'>login</button>
        </form>

        <small>Don't have an account? <Link to={'/register'}>Sign Up</Link></small>
      </div>
    </section>
  )
}

export default Login