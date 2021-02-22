import React, { useEffect } from 'react'
import '../Styles/_ItemScreen.scss'
import { useDispatch, useSelector } from 'react-redux'
import LbsToCases from '../Components/LbsToCases'
import { listItemDetails } from '../Actions/itemActions'

const ItemScreen = ({ match }) => {
  const dispatch = useDispatch()
  const itemDetails = useSelector((state) => state.itemDetails)
  const { loading, error, item } = itemDetails
  useEffect(() => {
    dispatch(listItemDetails(match.params.id))
  }, [dispatch, match])

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="item-info-screen">
      <div className="item-info-container md-bold">
        <div className="item-number lg-bold">{item._id}</div>
        <div className="item-info">
          <div>
            <div className="item-title">Description</div>
            <div className="item-subtitle">{item.description}</div>
          </div>
          <div>
            <div className="item-title">Type</div>
            <div className="item-subtitle">{item.type}</div>
          </div>
          <div>
            <div className="item-title">Cases Per Pallet</div>
            <div className="item-subtitle">{item.casesPerPallet}</div>
          </div>
          <div>
            <div className="item-title">Lbs Per Case</div>
            <div className="item-subtitle">{item.lbsPerCase} lbs</div>
          </div>
          <div>
            <div className="item-title">Micro Hold Days</div>
            <div className="item-subtitle">{item.microHoldDays}</div>
          </div>
          <div>
            <div className="item-title">3PL Picking Days</div>
            <div className="item-subtitle">{item.pickingDays3PL}</div>
          </div>
          <div>
            <div className="item-title">WOC</div>
            <div className="item-subtitle">{item.WOC}</div>
          </div>
          <div>
            <div className="item-title">Shelf Life</div>
            <div className="item-subtitle">{item.shelfLife}</div>
          </div>
        </div>
        <LbsToCases
          lbsPerCase={item.lbsPerCase}
          casePerPallet={item.casesPerPallet}
        />
      </div>
    </div>
  )
}

export default ItemScreen
