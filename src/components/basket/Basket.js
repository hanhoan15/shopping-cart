import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import BasketItem from './BasketItem';
import BasketPrice from './BasketPrice';
import { createSelector } from 'reselect';
import { beginSetCarts } from "../../redux/actions/productsActions";

export default function Basket() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts.products);

  const selectCarts = createSelector(
    (state) => state.selectedProducts.items,
    (items) => items.map((item) => ({...products.find((x) => x.id === item.product_id), quantity: item.quantity}))
  )

  const cartItems = useSelector(selectCarts);

  const onSuccess = (res) => {
    console.log(res);
  };

  useEffect(()=>{
    dispatch(beginSetCarts(onSuccess));
  }, [products]);

  const itemsPrice = cartItems.reduce((a, c) => a + c.price*c.quantity, 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 2000 ? 0 : 50;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  return (
    <aside className="block col-1 line-height-1-7">
      <h2>Cart items</h2>
      <div>
        {cartItems.length === 0 && <div>Cart is empty</div>}
        {cartItems.map((item) => (
          <BasketItem item={item}/>
        ))}
      </div>

      {cartItems.length !== 0 && (
        <>
          <hr/>
          <BasketPrice price={itemsPrice} title={'Item price'}></BasketPrice>
          <BasketPrice price={taxPrice} title={'Tax price'}></BasketPrice>
          <BasketPrice price={shippingPrice} title={'Shipping price'}></BasketPrice>
          <BasketPrice price={totalPrice} bold={true} title={'Total price'}></BasketPrice>
          <hr/>
          <div className="row">
            <button className="checkout" onClick={()=> alert("Cart checkout")}>Checkout</button>
          </div>
        </>
      )}
    </aside>
  );
}