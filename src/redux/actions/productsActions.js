import { ActionTypes } from "../constants/action-types";

export const beginSetProductCategories = (onSuccess) => ({
  type: ActionTypes.BEGIN_SET_PRODUCT_CATEGORIES,
  onSuccess,
});

export const setProductCategories = (products) => {
  return {
    type: ActionTypes.SET_PRODUCT_CATEGORIES,
    payload: products
  }
}

export const beginSetProducts = (params) => ({
  type: ActionTypes.BEGIN_SET_PRODUCTS,
  ...params,
});

export const setProducts = (products) => {
  return {
    type: ActionTypes.SET_PRODUCTS,
    payload: products
  }
}

export const beginSetCarts = (onSuccess) => ({
  type: ActionTypes.BEGIN_SET_CARTS,
  onSuccess,
});

export const setCarts = (products) => {
  return {
    type: ActionTypes.SET_CARTS,
    payload: products
  }
}

export const beginSelectedProduct = (params) => {
  return {
    type: ActionTypes.BEGIN_SELECTED_PRODUCT,
    ...params
  }
}

export const selectedProduct = (product) => {
  return {
    type: ActionTypes.SELECTED_PRODUCT,
    payload: product
  }
}

export const beginRemoveSelectedProducts = (params) => {
  return {
    type: ActionTypes.BEGIN_REMOVE_SELECTED_PRODUCT,
    ...params
  }
}

export const removeSelectedProducts = (product) => {
  return {
    type: ActionTypes.REMOVE_SELECTED_PRODUCT,
    payload: product
  }
}

export const updateSelectedProducts = (product) => {
  return {
    type: ActionTypes.UPDATE_SELECTED_PRODUCT,
    payload: product
  }
}

export const beginUpdateSelectedProducts = (params) => {
  return {
    type: ActionTypes.BEGIN_UPDATE_SELECTED_PRODUCT,
    ...params
  }
}