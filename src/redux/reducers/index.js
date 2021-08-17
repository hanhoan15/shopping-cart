import { combineReducers } from "redux";
import { productReducer, selectedProductReducer } from "./productsReducer";

const reducers = combineReducers({
  allProducts: productReducer,
  selectedProducts: selectedProductReducer
});

export default reducers;