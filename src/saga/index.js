import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import {
  setProductCategories,
  setProducts,
  selectedProduct,
  setCarts,
  updateSelectedProducts,
  removeSelectedProducts,
} from "../redux/actions/productsActions";
import { ActionTypes } from "../redux/constants/action-types";
import rsf from "../firestore";
import firebase from "firebase";

function* getProducts({ categoryId, onSuccess }) {
  try {
    const colRef = firebase.firestore().collection("products")

    const response = yield call(rsf.firestore.getCollection, colRef.where("category_id", "==", parseInt(categoryId)))
    onSuccess(true);

    yield put(setProducts(response));
  } catch (e) {
    console.error(e);
  }
}

function* getProductCategories({ onSuccess }) {
  try {
    const categories_response = yield call(rsf.firestore.getCollection, "categories");

    onSuccess(true);
    yield put(setProductCategories(categories_response));
  } catch (e) {
    console.error(e);
  }
}

function* getCarts({ onSuccess }) {
  try {
    const response = yield call(rsf.firestore.getCollection, 'carts')

    onSuccess(true);
    yield put(setCarts(response));
  } catch (e) {
    console.error(e);
  }
}

function* addCart({ id }) {
  try {
    const newCart = {
      product_id: id,
      quantity: 1
    };
    yield call(rsf.firestore.addDocument, "carts", newCart);
    const response = yield call(rsf.firestore.getCollection, 'carts')

    yield put(selectedProduct(response));
  } catch (e) {
    console.error(e);
  }
}

function* updateCart({ id, quantity }) {
  try {
    yield call(
      rsf.firestore.updateDocument,
      `carts/${id}`,
      "quantity",
      quantity
    );
    const response = yield call(rsf.firestore.getCollection, 'carts')

    yield put(updateSelectedProducts(response));
  } catch (e) {
    console.error(e);
  }
}

function* deleteCart({id}) {
  try {
    yield call(rsf.firestore.deleteDocument, `carts/${id}`);
    const response = yield call(rsf.firestore.getCollection, 'carts')

    yield put(removeSelectedProducts(response));
  } catch (error) {
    console.error(error);
  }
}


function* rootSaga() {
  yield takeLatest(ActionTypes.BEGIN_SET_PRODUCT_CATEGORIES, getProductCategories);
  yield takeEvery(ActionTypes.BEGIN_SET_PRODUCTS, getProducts);
  yield takeLatest(ActionTypes.BEGIN_SET_CARTS, getCarts);
  yield takeLatest(ActionTypes.BEGIN_SELECTED_PRODUCT, addCart);
  yield takeLatest(ActionTypes.BEGIN_UPDATE_SELECTED_PRODUCT, updateCart);
  yield takeLatest(ActionTypes.BEGIN_REMOVE_SELECTED_PRODUCT, deleteCart);
}

export default rootSaga;