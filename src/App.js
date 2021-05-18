import "./App.css";
import ProductPage from "./pages/ProductPage";
import axios from "./axios";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import HomePage from "./pages/HomePage";
import Modal from './components/Modal'
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get("/data.json").then((res) => {
      dispatch({ type: "SET_DATA", payload: res.data });
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
              <Modal/>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/productPage">
              <ProductPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
