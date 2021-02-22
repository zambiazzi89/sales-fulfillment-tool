import axios from 'axios'
import {
  CUSTOMER_LIST_FAIL,
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_DETAILS_FAIL,
  CUSTOMER_DETAILS_REQUEST,
  CUSTOMER_DETAILS_SUCCESS,
} from '../Constants/customerConstants'
import { logout } from './userActions'

export const listCustomers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOMER_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${userInfo.apiPath}/customers`, config)

    const dataCustomers = data.map((obj) => obj._id).sort()

    dispatch({ type: CUSTOMER_LIST_SUCCESS, payload: dataCustomers })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: CUSTOMER_LIST_FAIL,
      payload: message,
    })
  }
}

export const listCustomerDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOMER_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `${userInfo.apiPath}/customers/${id}`,
      config
    )

    dispatch({
      type: CUSTOMER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: CUSTOMER_DETAILS_FAIL,
      payload: message,
    })
  }
}
