import React from 'react'
import { useSelector } from 'react-redux'

const HomeScreen = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div className="login-error">{error}</div>
  ) : (
    userInfo && (
      <div className="home-view">
        <div className="home-hi-user">Hi {userInfo.name},</div>
        <div className="home-welcome">Welcome to the Fulfillment Tool!</div>
        <div className="home-message">
          Please select an option from the menu
        </div>
      </div>
    )
  )
}

export default HomeScreen
