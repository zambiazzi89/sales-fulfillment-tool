import React, { useEffect, useState } from 'react'
import '../Styles/_CustomerScreen.scss'
import { useDispatch, useSelector } from 'react-redux'
import { listCustomerDetails } from '../Actions/customerActions'
import InputSuggestions from '../Components/InputSuggestions'
import LbsToCases from '../Components/LbsToCases'

const CustomerScreen = ({ match }) => {
  const [customerSearch, setCustomerSearch] = useState('')
  const [selectedItem, setSelectedItem] = useState('')

  const dispatch = useDispatch()
  const customerDetails = useSelector((state) => state.customerDetails)
  const { loading, error, data } = customerDetails

  useEffect(() => {
    dispatch(listCustomerDetails(match.params.id))
    return () => {
      // Clean search/selected item when unmounting to avoid customer conflicts
      setCustomerSearch('')
      setSelectedItem('')
    }
  }, [match, dispatch])

  useEffect(() => {
    if (data.customer.items) {
      if (Object.values(data.customer.items).includes(customerSearch)) {
        setSelectedItem(
          Object.keys(data.customer.items).find(
            (k) => data.customer.items[k] === customerSearch
          )
        )
      } else {
        setSelectedItem('')
      }
    } else {
      setSelectedItem('')
    }
  }, [customerSearch, data])

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="customer-info-container">
      <div className="customer-name">
        <div className="lg-bold">{data.customer.name}</div>
        <div className="md-bold">{data.customer._id}</div>
      </div>
      <div className="customer-items-container">
        <div className="customer-items-title md-bold">Customer Items</div>
        <div className="input-customer-items-container">
          <label className="desktop-only">Filter By Item Number</label>
          <InputSuggestions
            placeholder="Type Item For Suggestions"
            className="input-customer-items"
            optionArray={Object.values(data.customer.items)}
            widthValue="250px"
            search={customerSearch}
            setSearch={setCustomerSearch}
            setSelectedOption={setCustomerSearch}
          />
        </div>
        <div className="item-header sm-bold item-info-area">
          <div className="info-sub">
            <div className="info-in">Item #</div>
            <div className="info-cin">Customer Item #</div>
            <div className="info-cpp">Cases/Pallet</div>
            <div className="info-lpc">Lbs/Case</div>
          </div>
        </div>
        {Object.keys(data.customer.items)
          .filter(
            (item) =>
              data.customer.items[item]
                .toLowerCase()
                .indexOf(customerSearch.toLowerCase()) > -1
          )
          .map(
            (item) =>
              data.customerItemObject[item] && (
                <div key={item} className="item-rows item-info-area">
                  <div className="info-sub">
                    <div className="info-in">{item}</div>
                    <div className="info-cin">{data.customer.items[item]}</div>
                    <div className="info-cpp">
                      {data.customerItemObject[item].casesPerPallet}
                    </div>
                    <div className="info-lpc">
                      {data.customerItemObject[item].lbsPerCase}
                    </div>
                  </div>
                  <div className="info-dt">
                    {data.customerItemObject[item].description}
                  </div>
                </div>
              )
          )}
        {selectedItem && (
          <LbsToCases
            lbsPerCase={data.customerItemObject[selectedItem].lbsPerCase}
            casePerPallet={data.customerItemObject[selectedItem].casesPerPallet}
          />
        )}
      </div>
    </div>
  )
}

export default CustomerScreen
