import {
  LTL_LIST_FAIL,
  LTL_LIST_REQUEST,
  LTL_LIST_SUCCESS,
} from '../Constants/LTLConstants'

export const LTLListReducer = (
  state = { loading: true, data: { LTL: {}, threePL: {} } },
  action
) => {
  switch (action.type) {
    case LTL_LIST_REQUEST:
      return { loading: true, ...state }
    case LTL_LIST_SUCCESS:
      return { loading: false, data: action.payload }
    case LTL_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
