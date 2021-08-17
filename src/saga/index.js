import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import {
  setProductCategories,
  setProducts,
  selectedProduct,
  setCarts,
} from "../redux/actions/productsActions";
import { ActionTypes } from "../redux/constants/action-types";
import rsf from "../firestore";
import firebase from "firebase";

function* getProducts({ categoryId, onSuccess }) {
  try {
    const colRef = firebase.firestore().collection("products")
    const products = [];

    const response = yield call(rsf.firestore.getCollection, colRef.where("category_id", "==", parseInt(categoryId)))
    response.forEach((doc) => {
      const data = doc.data();
      products.push({ id: doc.id, ...data });
    });
    onSuccess(true);

    yield put(setProducts(products));
  } catch (e) {
    console.error(e);
  }
}

function* getProductCategories({ onSuccess }) {
  try {
    const categories = [];
    const categories_response = yield call(rsf.firestore.getCollection, "categories");

    categories_response.forEach((doc) => {
      const data = doc.data();
      categories.push({ id: doc.id, ...data });
    });

    onSuccess(true);
    yield put(setProductCategories(categories));
  } catch (e) {
    console.error(e);
  }
}

function* getCarts({ onSuccess }) {
  try {
    const products = [];
    const response = yield call(rsf.firestore.getCollection, 'carts')
    response.forEach((doc) => {
      const data = doc.data();
      products.push({ id: doc.id, product_id: data.product_id, quantity: data.quantity });
    });
    onSuccess(true);
    yield put(setCarts(products));
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
    
    const products = [];
    const response = yield call(rsf.firestore.getCollection, 'carts')
    response.forEach((doc) => {
      const data = doc.data();
      products.push({ id: doc.id, product_id: data.product_id, quantity: data.quantity });
    });
    yield put(selectedProduct(products));
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

    const products = [];
    const response = yield call(rsf.firestore.getCollection, 'carts')
    response.forEach((doc) => {
      const data = doc.data();
      products.push({ id: doc.id, product_id: data.product_id, quantity: data.quantity });
    });
    yield put(selectedProduct(products));
  } catch (e) {
    console.error(e);
  }
}

function* deleteCart({id}) {
  try {
    yield call(rsf.firestore.deleteDocument, `carts/${id}`);

    const products = [];
    const response = yield call(rsf.firestore.getCollection, 'carts')
    response.forEach((doc) => {
      const data = doc.data();
      products.push({ id: doc.id, product_id: data.product_id, quantity: data.quantity });
    });
    yield put(selectedProduct(products));
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