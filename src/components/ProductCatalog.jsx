import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../redux/productSlice';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/createSlice';

const ProductCatalog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);
  const cartItems = useSelector((state) => state.cart.items); 

  useEffect(() => {
    const loadProducts = () => {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        dispatch(setProducts(JSON.parse(storedProducts)));
      }
    };
    loadProducts();
  }, [dispatch]);

  const handleAddToCart = (product) => {
    const existingProduct = cartItems.find(item => item.id === product.id);

    if (existingProduct) {
      alert("This product is already in your cart.");
    } else {
      const productToAdd = {
        ...product,
        price: parseFloat(product.price),
      };
      dispatch(addToCart(productToAdd));
      navigate('/cart');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Product Catalog</h2>

      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4 mt-3" key={product.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">Available Stock: {product.stock}</p>
                <button 
                  className="btn btn-dark" 
                  onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
