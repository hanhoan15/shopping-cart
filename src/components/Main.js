import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { beginSetProductCategories } from "../redux/actions/productsActions";
import ProductGroup from './product/ProductGroup';

export default function Main() {
  const categories = useSelector((state) => state.allProducts.categories);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(beginSetProductCategories(onSuccess));
  }, []);

  const onSuccess = (res) => {
    console.log(res);
  };

  return (
    <main className="block col-2">
      <h2>Products</h2>
      <div className="product">
      {
        categories.length === 0 ? (
          <div>...Loading</div>
        ) : <>
          {categories.map((category)=>(
              <ProductGroup key={category.id} productGroup={category}></ProductGroup>
            ))}
        </>
      }
      </div>
    </main>
  );
}