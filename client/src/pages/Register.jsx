import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
// require('dotenv').config()


const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const changeInputHandle = (e) => {
    setUserData(prevState => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  const registerUser = async (e) => {
    e.preventDefault()
    setError("")
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData)
      const newUser = await response.data;
      console.log(newUser)

      if (!newUser) {
        setError("Couldn't register user. Please try again")
      }
      navigate('/')

    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form action="" className="form register_form" onSubmit={registerUser}>
          {
            error && <p className="form_error-message">{error}</p>
          }
          <input type="text" placeholder='Full Name' name='name' value={userData.name} onChange={changeInputHandle} autoFocus />
          <input type="email" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandle} />
          <input type="password" placeholder='Password' name='password' value={userData.password} onChange={changeInputHandle} />
          <input type="password" placeholder='Confirm Password' name='cPassword' value={userData.cPassword} onChange={changeInputHandle} />
          <button type='submit' className='btn primary'>Register</button>
        </form>

        <small>Already have an account? <Link to={'/login'}>SignIn</Link></small>
      </div>
    </section>
  )
}

export default Register