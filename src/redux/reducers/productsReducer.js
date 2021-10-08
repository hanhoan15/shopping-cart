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
      return buildSetProductCategories({state, payload});
    default:
      return state;
  }
}

const buildAddNewProducts = ({ state, payload }) => {
  const products = [];
  payload.forEach((doc) => {
    const data = doc.data();
    products.push({ id: doc.id, ...data });
  });

  return {
    ...state,
    products: [...state.products, ...products],
  };
};

const buildSetProductCategories = ({ state, payload }) => {
  const categories = [];
  payload.forEach((doc) => {
    const data = doc.data();
    categories.push({ id: doc.id, ...data });
  });

  return {...state, categories: categories};
};

export const selectedProductReducer = (state = {items:[]}, {type, payload}) => {
  switch (type) {
    case ActionTypes.SET_CARTS:
      return buildSetCarts({state, payload});
    case ActionTypes.SELECTED_PRODUCT:
      return buildSelectedProduct({state, payload});
    case ActionTypes.UPDATE_SELECTED_PRODUCT:
      return buildUpdateSelectedProduct({state, payload});
    case ActionTypes.REMOVE_SELECTED_PRODUCT:
      return buildRemoveSelectedProduct({state, payload});
    default:
      return state;
  }
}

const buildSetCarts = ({ state, payload }) => {
  const products = [];
  payload.forEach((doc) => {
    const data = doc.data();
    products.push({ id: doc.id, product_id: data.product_id, quantity: data.quantity });
  });

  return {...state, items: products};
};

const buildSelectedProduct = ({ state, payload }) => {
  const products = [];
  payload.forEach((doc) => {
    const data = doc.data();
    products.push({ id: doc.id, product_id: data.product_id, quantity: data.quantity });
  });

  return {...state, items: products};
};

const buildUpdateSelectedProduct = ({ state, payload }) => {
  const products = [];
  payload.forEach((doc) => {
    const data = doc.data();
    products.push({ id: doc.id, product_id: data.product_id, quantity: data.quantity });
  });

  return {...state, items: products};
};

const buildRemoveSelectedProduct = ({ state, payload }) => {
  const products = [];
  payload.forEach((doc) => {
    const data = doc.data();
    products.push({ id: doc.id, product_id: data.product_id, quantity: data.quantity });
  });

  return {...state, items: products};
};
