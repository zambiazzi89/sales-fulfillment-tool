import axios from 'axios'
import {
  ITEM_DETAILS_FAIL,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_SUCCESS,
  ITEM_LIST_FAIL,
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
} from '../Constants/itemConstants'
import { logout } from './userActions'

export const listItems = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ITEM_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`${userInfo.apiPath}/items`, config)

    const dataItems = data.map((obj) => obj._id).sort()

    dispatch({ type: ITEM_LIST_SUCCESS, payload: dataItems })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ITEM_LIST_FAIL,
      payload: message,
    })
  }
}

export const listItemDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ITEM_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    let apiPath
    if (userInfo.isAdmin) {
      apiPath = process.env.REACT_APP_RHINO_ROUTE
    } else {
      apiPath = process.env.REACT_APP_GUEST_ROUTE
    }

    const { data } = await axios.get(`${userInfo.apiPath}/items/${id}`, config)

    dispatch({ type: ITEM_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ITEM_DETAILS_FAIL,
      payload: message,
    })
  }
}
