import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function Register() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  })

  const onChangeInput = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const registerSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/user/register', { ...user })

      localStorage.setItem('firstLogin', true)

      window.location.href = "/"
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: "top-center",
        autoClose: 3000
      })
    }
  }

  return (
    <div className="login-page">
      <form onSubmit={registerSubmit} className="form-signin-signout">
        <h2>Sign up</h2>

        <label>Username</label>
        <input type="text" name="username"
          value={user.username}
          onChange={onChangeInput}
          required
        />

        <label>Email</label>
        <input type="email" name="email"
          value={user.email}
          onChange={onChangeInput}
          required
        />

        <label>Password</label>
        <input type="password" name="password"
          value={user.password}
          autoComplete="on"
          onChange={onChangeInput}
          required
        />
        <div className="row">
          <button type="submit">Sign up</button>
          <Link to="/login">Sign in</Link>
        </div>
      </form>
    </div>
  )
}

export default Register