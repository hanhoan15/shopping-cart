import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux';
import { beginSelectedProduct, beginUpdateSelectedProducts } from "../../redux/actions/productsActions";

export default function Product(props) {
  const { product } = props;
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

  return (
    <div>
      <img className="small" src={product.image} alt={product.name}></img>
      <h3 className="text-center">{product.name}</h3>
      <div className="text-center margin-05">From ${product.price}</div>
      <div className="text-center">
        <button className="buy" onClick={()=>onAdd(product)}>Buy</button>
      </div>
    </div>
  )
}

Product.propTypes = {
  id: PropTypes.number,
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
};

Product.defaultProps = {
  id: 0,
  image: '',
  name: '',
  price: 0,
};
