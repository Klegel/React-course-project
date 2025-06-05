// src/pages/goods-component.js
import React, { useState, useEffect } from "react";
import { LOCALSTORE_TOTALITEMS } from "../models/constants";

const itemsList = [
    { id: 1, name: "Товар 1" },
    { id: 2, name: "Товар 2" },
    { id: 3, name: "Товар 3" }
];

const GoodsComponent = () => {
    const [itemsToSell, setItemsToSell] = useState(itemsList);
    const [totalItems, setTotalItems] = useState([]);

    useEffect(() => {
        getLocalStore();
    }, []);

    const getLocalStore = () => {
        if (totalItems.length > 0) return;

        let cardsLocal = window.localStorage.getItem(LOCALSTORE_TOTALITEMS);
        cardsLocal = cardsLocal ? JSON.parse(cardsLocal) : [];

        if (Array.isArray(cardsLocal) && cardsLocal.length > 0) {
            setTotalItems([...cardsLocal]);
        }
    };

    const addItem = (cardItem) => {
        const updated = [...totalItems, cardItem];
        setTotalItems(updated);
        window.localStorage.setItem(LOCALSTORE_TOTALITEMS, JSON.stringify(updated));
    };

    const removeItem = (cardItem) => {
        const updated = totalItems.filter(item => item.id !== cardItem.id);
        setTotalItems(updated);
        window.localStorage.setItem(LOCALSTORE_TOTALITEMS, JSON.stringify(updated));
    };

    return (
        <div className="container">
            <h2>Список товарів</h2>
            {itemsToSell.map(item => (
                <div key={item.id}>
                    {item.name}
                    <button onClick={() => addItem(item)}>Додати</button>
                    <button onClick={() => removeItem(item)}>Видалити</button>
                </div>
            ))}
        </div>
    );
};

export default GoodsComponent;
