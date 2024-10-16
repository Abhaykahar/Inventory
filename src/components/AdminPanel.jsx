import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, deleteProduct, addProduct, updateProduct } from '../redux/productSlice';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const loadProducts = () => {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        dispatch(setProducts(JSON.parse(storedProducts)));
      }
    };
    loadProducts();
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleAddOrUpdate = () => {
    if (editingProduct) {
      dispatch(updateProduct({ ...editingProduct, ...newProduct }));
      setEditingProduct(null);
    } else {
      dispatch(addProduct({ id: Date.now(), ...newProduct }));
    }
    setNewProduct({ name: '', price: '', stock: '' });
  };

  const handleEdit = (product) => {
    setNewProduct({ name: product.name, price: product.price, stock: product.stock });
    setEditingProduct(product);
  };

  const lowStockThreshold = 5;
  const lowStockProducts = products.filter(product => product.stock < lowStockThreshold);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Admin Panel</h2>

      <div className="mb-4">
        <h4>{editingProduct ? 'Edit Product' : 'Add Product'}</h4>
        <div className="row">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              className="form-control mb-2"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            />
          </div>
        </div>
        <button className="btn btn-dark mt-2" onClick={handleAddOrUpdate}>
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
      </div>

      <h4 className="mt-4">Products</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button className="btn btn-dark btn-sm me-1" onClick={() => handleEdit(product)}>Edit</button>
                <button className="btn btn-dark btn-sm" onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="mt-4">Low Stock Products</h4>
      {lowStockProducts.length > 0 ? (
        <ul className="list-group">
          {lowStockProducts.map(product => (
            <li key={product.id} className="list-group-item">
              {product.name} - Stock: {product.stock}
            </li>
          ))}
        </ul>
      ) : (
        <p>No low stock products.</p>
      )}
    </div>
  );
};

export default AdminPanel;
