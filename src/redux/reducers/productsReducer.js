import { ActionTypes } from "../constants/action-types";

const intialState = {
  products: [],
  categories: []
}

export const productReducer = (state = intialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.SET_PRODUCTS:
      return buildAddNewProducts({state, payload});
    case ActionTypes.SET_PRODUCT_CATEGORIES:
      return {...state, categories: payload};
    default:
      return state;
  }
}

const buildAddNewProducts = ({ state, payload }) => {
  return {
    ...state,
    products: [...state.products, ...payload],
  };
};

export const selectedProductReducer = (state = {items:[]}, {type, payload}) => {
  switch (type) {
    case ActionTypes.SET_CARTS:
      return {...state, items: payload};
    case ActionTypes.SELECTED_PRODUCT:
      return {...state, items: payload};
    case ActionTypes.REMOVE_SELECTED_PRODUCT:
      return {...state, items: payload};
    default:
      return state;
  }
}
