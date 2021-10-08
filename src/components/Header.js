import React from 'react';
import { useSelector } from 'react-redux';

export default function Header() {
  const cartItems = useSelector(state => state.selectedProducts.items);
  const countCartItems = cartItems.length;

  return(
    <header className="row block center">
      <div>
        <a href="#/">
          <h1>Small shopping cart</h1>
        </a>
      </div>
      <div>
        <a href="#/cart">
          Cart {' '}
          {countCartItems > 0 && (<button className="badge">{countCartItems}</button>)}
        </a>
      </div>
    </header>
  );
}