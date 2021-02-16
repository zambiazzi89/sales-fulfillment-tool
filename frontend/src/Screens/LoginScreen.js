import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { FaEye } from 'react-icons/fa'
import { login } from '../Actions/userActions'
import './_LoginScreen.scss'

const LoginScreen = ({ history }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [showPassword, setShowPassword] = useState(false)
  const usernameRef = useRef()
  const passwordRef = useRef()

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
  }, [history, userInfo])

  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(username, password))
  }

  return (
    <div className="login-screen">
      <form className="login-container" onSubmit={handleSubmit}>
        <div className="login-header">LOGIN</div>
        <div className="login-inputs">
          <div className="login-title-input">
            <label className="login-title">USERNAME</label>
            <input
              type="text"
              name="username"
              autoComplete="off"
              ref={usernameRef}
              id="login-username"
              placeholder="Enter a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="login-title-input">
            <label>PASSWORD</label>
            <input
              type="password"
              name="password"
              ref={passwordRef}
              autoComplete="off"
              id="login-password"
              placeholder="Enter a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/*<FaEye />*/}
          </div>
          {error && <div className="login-error">{error}</div>}
          {loading && <div>Loading...</div>}
        </div>
        <button
          type="submit"
          className="login-submit-button"
          onClick={handleSubmit}
        >
          SUBMIT
        </button>
      </form>
    </div>
  )
}

export default LoginScreen
