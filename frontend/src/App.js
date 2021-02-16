import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './Components/Header'
import HomeScreen from './Screens/HomeScreen.js'
import CustomerScreen from './Screens/CustomerScreen'
import ItemScreen from './Screens/ItemScreen'
import LTLScreen from './Screens/LTLScreen'
import CustomerShipping from './Components/CustomerShipping'
import LoginScreen from './Screens/LoginScreen'

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="body-container">
          <Switch>
            <Route path="/" exact component={HomeScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/customer/:id" component={CustomerScreen} />
            <Route path="/item/:id" component={ItemScreen} />
            <Route path="/LTL">
              <LTLScreen />
            </Route>
            <Route path="/customer-shipping">
              <CustomerShipping />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
