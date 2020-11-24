import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AppNavbar from "./component/AppNavbar";
import ShoppingList from "./component/ShoppingList";

const App = () => {
  return (
    <div>
      <AppNavbar></AppNavbar>
      <ShoppingList></ShoppingList>
    </div>
  );
};

export default App;
