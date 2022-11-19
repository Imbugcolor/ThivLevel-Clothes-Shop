import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function Forgotpassword() {
  const [email, setEmail] = useState('')
  const [isSend, setIsSend] = useState(true)

  const forgotpasswordSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setIsSend(false)
      await axios.post('/user/forgotpassword', {email})
      setIsSend(true) 
      toast.success('An email for resetting your password has been sent to your email', {
        position: "top-center",
        autoClose: 3000
      })
    } catch (error) {
      setIsSend(true)
      toast.error(error.response.data.msg, {
        position: "top-center",
        autoClose: 3000
      })
    }
  }

    
  return (
    <div className="login-page">
      <form onSubmit={forgotpasswordSubmit} className="form-signin-signout">
        <h2>Forgot Password</h2>
        {!isSend && 
          <div className='sendmail-status'>
            <FontAwesomeIcon
              icon={faSpinner} className="fa-spin"
            /> <span>We are sending the link for resetting password to your email...</span>    
          </div>       
        }
        <label>Type your Email</label>
        <input type="email" name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="row">
          <button type="submit">Submit</button>
          <Link to="/login">Sign in</Link>
        </div>
      </form>
    </div>
  )
}

export default Forgotpassword