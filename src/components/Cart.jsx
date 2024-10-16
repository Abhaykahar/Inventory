import React from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const totalAmount = cartItems.reduce((total, item) => {
    const price = typeof item.price === 'number' ? item.price : parseFloat(item.price);
    return total + price * (item.quantity || 1); 
  }, 0);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="alert alert-info text-center">
          Your cart is empty.
        </div>
      ) : (
        <div>
          <ul className="list-group">
            {cartItems.map((item, index) => {
              const price = typeof item.price === 'number' ? item.price : parseFloat(item.price);
              return (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>{item.name}</span>
                  <span>${price.toFixed(2)}</span>
                </li>
              );
            })}
          </ul>
          <h4 className="mt-3 text-end">Total: ${totalAmount.toFixed(2)}</h4>
          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-dark">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
