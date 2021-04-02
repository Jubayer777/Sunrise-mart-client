
import './App.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './Components/Home/Home';
import AddProduct from './Components/AddProduct/AddProduct';
import NoMatch from './Components/NoMatch/NoMatch';
import Checkout from './Components/Checkout/Checkout';
import Header from './Components/Header/Header';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Login from './Components/Login/Login';
import Orders from './Components/Orders/Orders';
import ManageProduct from './Components/ManageProduct/ManageProduct';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser]=useState({});
  return (
    <div className="background">
      <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
         <Router>
            <Header/>
              <Switch>
                    <Route path="/home">
                          <Home/>
                    </Route>
                    <PrivateRoute path="/manageProduct">
                          <ManageProduct/>
                    </PrivateRoute>
                    <PrivateRoute path="/addProduct">
                          <AddProduct />
                    </PrivateRoute>
                    <PrivateRoute path="/checkout/:id">
                         <Checkout/>
                    </PrivateRoute>
                    <PrivateRoute path="/orders">
                      <Orders/>
                    </PrivateRoute>
                    <Route exact path="/">
                          <Home/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="*">
                          <NoMatch/>
                    </Route>
              </Switch>
         </Router> 
      </UserContext.Provider>
    </div>
  );
}

export default App;
