import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { beginSelectedProduct, beginUpdateSelectedProducts, beginRemoveSelectedProducts } from "../../redux/actions/productsActions";

export default function BasketItem(props) {
  const { item } = props;
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.selectedProducts.items);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.product_id === product.id);
    if(exist) {
      dispatch(beginUpdateSelectedProducts({id: exist.id, quantity: exist.quantity + 1}));
    } else {
      dispatch(beginSelectedProduct({id: product.id, quantity: 1}));
    }
  }

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.product_id === product.id);
    if(exist.quantity === 1) {
      dispatch(beginRemoveSelectedProducts({id: exist.id}));
    } else {
      dispatch(beginUpdateSelectedProducts({id: exist.id, quantity: exist.quantity - 1}));
    }
  }

  return (
    <>
      {
        item.id ? 
          <>
            <div key={item.id} className="row">
            <div className="col-2">{item.name}</div>
            <div className="col-2">
              <button onClick={()=>onAdd(item)} className="add">
                +
              </button>
              <button onClick={()=>onRemove(item)} className="remove">
                -
              </button>
            </div>

            <div className="col-2 text-right">
              {item.quantity} x ${item.price.toFixed(2)}
            </div>
          </div>
        </> : (
          <div>...Loading</div>
        )
      }
    </>
  )
}
