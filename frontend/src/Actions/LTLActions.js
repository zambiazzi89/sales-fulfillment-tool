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

    const { data } = await axios.get(`${userInfo.apiPath}/LTL`, config)

    dispatch({ type: LTL_LIST_SUCCESS, payload: data })
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
