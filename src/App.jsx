import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './store'; 
import Login from './components/Login'; 
import SignUp from './components/SignUp'; 
import ProductCatalog from './components/ProductCatalog'; 
import OrderHistory from './components/OrderHistory';
import AdminPanel from './components/AdminPanel'; 
import Header from './components/Header'; 
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './components/Cart'; 

const App = () => {
  const isAdmin = true; 

  return (
    <Provider store={store}>
      <Router>
        <Header /> 
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <ProductCatalog isAdmin={isAdmin} />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/cart" 
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/order-history" 
            element={
              <PrivateRoute>
                <OrderHistory />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/admin" 
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
