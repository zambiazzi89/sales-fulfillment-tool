import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { itemListReducer, itemDetailsReducer } from './Reducers/itemReducers'
import {
  customerListReducer,
  customerDetailsReducer,
} from './Reducers/customerReducers'
import { LTLListReducer } from './Reducers/LTLReducer'
import { userDetailsReducer, userLoginReducer } from './Reducers/userReducers'

const reducer = combineReducers({
  itemList: itemListReducer,
  itemDetails: itemDetailsReducer,
  customerList: customerListReducer,
  customerDetails: customerDetailsReducer,
  LTLList: LTLListReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
