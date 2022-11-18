import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import TestComponent from "./components/TestComponent/TestComponent";
import "./App.css";
import About from "./components/About";
import MealsMenu from "./components/MealsMenu";
import Footer from "./components/Footer";
import Home from "./components/Home";
import AddMeal from "./components/AddMeal";
import Navbar from "./Navbar";
import { UserProvider } from "./LocalContext";
import MealwithId from "./components/MealwithId";

function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <UserProvider>
          <Navbar />
          <Router>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path="/meals">
              <MealsMenu></MealsMenu>
            </Route>
            <Route exact path="/add-meal">
              <AddMeal></AddMeal>
            </Route>
            <Route exact path="/meals/:id">
              <MealwithId></MealwithId>
            </Route>
            <Route exact path="/about">
              <About></About>
            </Route>
          </Router>
        </UserProvider>
      </div>
      <Footer />
    </div>
  );
}
export default App;

/*function App() {
  return (
    <Router>
      <Route exact path="/">
        <p>test</p>
      </Route>
      <Route exact path="/lol">
        <p>lol</p>
      </Route>
      <Route exact path="/test-component">
        <TestComponent></TestComponent>
      </Route>
    </Router>
  );
}
*/
