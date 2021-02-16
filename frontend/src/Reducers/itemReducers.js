import {
  ITEM_LIST_FAIL,
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  ITEM_DETAILS_FAIL,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_SUCCESS,
} from '../Constants/itemConstants'

export const itemListReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case ITEM_LIST_REQUEST:
      return { loading: true, items: [] }
    case ITEM_LIST_SUCCESS:
      return { loading: false, items: action.payload }
    case ITEM_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const itemDetailsReducer = (state = { item: {} }, action) => {
  switch (action.type) {
    case ITEM_DETAILS_REQUEST:
      return { ...state, loading: true }
    case ITEM_DETAILS_SUCCESS:
      return { loading: false, item: action.payload }
    case ITEM_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
