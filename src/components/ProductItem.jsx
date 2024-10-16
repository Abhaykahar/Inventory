import React from 'react';

const ProductItem = ({ product, onAddToCart }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">Price: ${product.price.toFixed(2)}</p>
        <p className="card-text">Stock: {product.stock}</p>
        <button className="btn btn-primary" onClick={onAddToCart} disabled={product.stock === 0}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
