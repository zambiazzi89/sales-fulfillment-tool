import {
  LTL_LIST_FAIL,
  LTL_LIST_REQUEST,
  LTL_LIST_SUCCESS,
} from '../Constants/LTLConstants'

export const LTLListReducer = (state = { LTL: {} }, action) => {
  switch (action.type) {
    case LTL_LIST_REQUEST:
      return { loading: true, LTL: {} }
    case LTL_LIST_SUCCESS:
      return { loading: false, LTL: action.payload }
    case LTL_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
