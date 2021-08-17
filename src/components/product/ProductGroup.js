import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { beginSetProducts } from "../../redux/actions/productsActions";
import { createSelector } from 'reselect';
import Product from './Product'


export default function ProductGroup(props) {
  const { productGroup } = props
  const dispatch = useDispatch();

  const selectProducts = createSelector(
    (state) => state.allProducts.products,
    (products) => products.filter((product) => product.category_id == productGroup.id)
  )

  const products = useSelector(selectProducts);

  useEffect(()=>{
    dispatch(beginSetProducts({
      categoryId: productGroup.id,
      onSuccess: onSuccess,
    }));
  }, []);

  const onSuccess = (res) => {
    console.log(res);
  };

  return (
    <div className="product-group title">
    <h2>{productGroup.title}</h2>
      <div className="row">
        {
          products.length === 0 ? (
          <div>...Loading</div>
        ) : <>
          {
            products.map((product)=>(
              <Product key={product.id} product={product}></Product>
            ))
          }
        </>
        }
      </div>
    </div>
  )
}
