import "./App.css";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import ContactUs from "./pages/contactUs/ContactUs";
import StorePage from "./pages/store/store-page";
import ItemDisplay from "./components/itemDisplay/ItemDisplay";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import Home from "./pages/home/Home.js";
import SignUp from "./pages/signUp/SignUp";
import SignIn from "./pages/signIn/SignIn";
import aboutUs from "./pages/aboutUs/AboutUs";
import Service from "./pages/service/service-page";
import Cart from "./pages/cart/crat-page";
import { CountContext } from "./utils/countContext";

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [nbOrder, setNbOrder] = useState(
    localStorage.getItem("nbOrders") === null ||
      localStorage.getItem("nbOrders") < 0
      ? 0
      : localStorage.getItem("nbOrders")
  );

  const fetchSearchValue = (value) => {
    setSearchValue(value);
  };

  return (
    <CountContext.Provider value={{ nbOrder, setNbOrder }}>
      <Router>
        <div className="App">
          <Router>
            <NavBar
              searchValue={searchValue}
              fetchSearchValue={fetchSearchValue}
            />
            <Switch>
              <Route path="/" component={Home} exact />
              <Route
                path="/store"
                render={(props) => {
                  return <StorePage {...props} searchValue={searchValue} />;
                }}
                exact
              />
              <Route
                path="/store/:title"
                render={(props) => <ItemDisplay {...props} />}
                exact
              />
              <Route path="/contact-us" component={ContactUs} exact />
              <Route
                path="/services"
                render={(props) => {
                  return <Service {...props} searchValue={searchValue} />;
                }}
                exact
              />
              <Route path="/about-us" component={aboutUs} exact />
              <Route path="/cart" component={Cart} exact />
              <Route path="/log-in" component={SignIn} exact />
              <Route path="/sign-up" component={SignUp} exact />
            </Switch>
          </Router>
        </div>
      </Router>
    </CountContext.Provider>
  );
};

export default App;
