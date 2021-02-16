import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../Images/rhino_foods_logo.png'
import b_corp from '../Images/b_corp_2020.png'
import HeaderBackground from './HeaderBackground'
import delicious_things from '../Images/delicious_things.svg'
import InputSuggestions from './InputSuggestions'
import { listItems } from '../Actions/itemActions'
import { listCustomers } from '../Actions/customerActions'
import { logout } from '../Actions/userActions'
import { FaUser } from 'react-icons/fa'
import { IoLogOutOutline } from 'react-icons/io5'

const Header = ({ match }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const itemList = useSelector((state) => state.itemList)
  const { loading: itemListLoading, error: itemListError, items } = itemList

  const customerList = useSelector((state) => state.customerList)
  const {
    loading: customerListLoading,
    error: customerListError,
    customers,
  } = customerList

  useEffect(() => {
    dispatch(listItems())
    dispatch(listCustomers())
  }, [dispatch, match, userInfo])

  const [itemSearch, setItemSearch] = useState('')
  const [selectedItem, setSelectedItem] = useState('')

  const [customerSearch, setCustomerSearch] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState('')

  const history = useHistory()

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }
  }, [history, userInfo])

  useEffect(() => {
    if (selectedItem) {
      history.push(`/item/${selectedItem}`)
      setSelectedItem('')
      setCustomerSearch('')
    }
    if (selectedCustomer) {
      history.push(`/customer/${selectedCustomer}`)
      setSelectedCustomer('')
      setItemSearch('')
    }
  }, [selectedItem, selectedCustomer, history])

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div className="header-and-guest-warning">
      <div className="header-background-color">
        <div className="hide-headerbackground-overflow">
          <HeaderBackground />
        </div>
        <div className="header-and-subheader">
          <header>
            <Link to="/">
              <img src={logo} alt="Logo" className="logo" />
            </Link>
            <a
              href="https://www.rhinofoods.com/"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img
                src={delicious_things}
                alt="Delicious Things, Done Right."
                className="delicious-things"
              />
            </a>
            <a
              href="https://www.rhinofoods.com/certified-b-corporation"
              target="_blank"
              rel="noreferrer noopener"
            >
              <img src={b_corp} alt="B Corp 2020" className="b-corp" />
            </a>
          </header>
          <div className="sub-header">
            {customerListLoading || itemListLoading ? (
              <div>Loading...</div>
            ) : customerListError || itemListError || !(customers || items) ? (
              <Link to="./login" className="login-link">
                <FaUser />
                <div>LOGIN</div>
              </Link>
            ) : (
              <>
                <div className="customer-menu">
                  <label htmlFor="customers">Customer</label>
                  <InputSuggestions
                    placeholder="Select a Customer"
                    className="input-header-customers"
                    optionArray={customers}
                    widthValue="150px"
                    search={customerSearch}
                    setSearch={setCustomerSearch}
                    setSelectedOption={setSelectedCustomer}
                  />
                </div>
                <div className="item-menu">
                  <label htmlFor="items">Item</label>
                  <InputSuggestions
                    placeholder="Select an Item"
                    className="input-header-items"
                    optionArray={items}
                    widthValue="100px"
                    search={itemSearch}
                    setSearch={setItemSearch}
                    setSelectedOption={setSelectedItem}
                  />
                </div>
                <Link to="/LTL" className="subheader-button">
                  <div> LTL Calculator</div>
                </Link>
                {/*
              <Link to="/Info-Procedures" className="subheader-button">
                <div>General Info and Procedures</div>
              </Link>
              */}
                <Link
                  to="./login"
                  className="login-link"
                  onClick={logoutHandler}
                >
                  <IoLogOutOutline />
                  <div>LOGOUT</div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      {userInfo && !userInfo.isAdmin && (
        <div className="guest-user-warning sm-bold">
          For confidentiality, Guest User only has access to mock data created
          with Mockaroo
        </div>
      )}
    </div>
  )
}

export default Header
