import React from 'react'
import './_CustomerShipping.scss'
import { FaTruck, FaBarcode, FaStickyNote } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const CustomerShipping = () => {
  return (
    <div className="customer-landing-container">
      <div className="logo-and-name">
        <div className="customer-name lg-bold">Customer # - Name</div>
      </div>
      <div className="customer-info-menu">
        <Link to="./shipping" className="customer-shipping-icon menu-option">
          <FaTruck className="menu-option-icon" />
          <div>SHIPPING</div>
        </Link>
        <Link to="./items" className="customer-items-icon menu-option">
          <FaBarcode className="menu-option-icon" />
          <div>ITEMS</div>
        </Link>
        <Link to="./notes" className="customer-notes-icon menu-option">
          <FaStickyNote className="menu-option-icon" />
          <div>NOTES</div>
        </Link>
      </div>
    </div>
  )
}

export default CustomerShipping
