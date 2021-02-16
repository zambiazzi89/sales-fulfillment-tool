import axios from 'axios'
import {
  LTL_LIST_FAIL,
  LTL_LIST_REQUEST,
  LTL_LIST_SUCCESS,
} from '../Constants/LTLConstants'
import { logout } from './userActions'

export const listLTL = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LTL_LIST_REQUEST })

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

    const { data } = await axios.get(`${apiPath}/LTL`, config)

    const dataLTL = data.stateValues

    dispatch({ type: LTL_LIST_SUCCESS, payload: dataLTL })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: LTL_LIST_FAIL,
      payload: message,
    })
  }
}
