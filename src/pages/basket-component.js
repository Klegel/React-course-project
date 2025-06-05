// src/pages/basket-component.js
import React from "react";
import { LOCALSTORE_TOTALITEMS } from "../models/constants";

const BasketComponent = () => {
  const getLocalStore = () => {
    let cardsLocal = window.localStorage.getItem(LOCALSTORE_TOTALITEMS);
    cardsLocal = cardsLocal ? JSON.parse(cardsLocal) : [];

    if (!Array.isArray(cardsLocal) || cardsLocal.length === 0) {
      return <div>Немає вибраних товарів</div>;
    }

    return cardsLocal.map(item => (
      <div key={item.id}>{item.name}</div>
    ));
  };

  return (
    <div className="container">
      <h2>Список вибраних товарів</h2>
      {getLocalStore()}
    </div>
  );
};

export default BasketComponent;
