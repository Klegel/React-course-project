// src/App.js
import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Компоненти та стилі
import Basket from "./components/Basket";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import ContactPage from "./pages/ContactPage";
import Footer from "./components/Footer";

// !!! ВАЖЛИВО: Bootstrap CSS ПОВИНЕН БУТИ ПЕРШИМ !!!
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS

// Потім ваш глобальний CSS
import "./App.css"; // Основний CSS файл

// Інші імпорти (можливо, не всі використовуються в App.js напряму, але перевірте)
import ProductCard from "./components/ProductCard";
import ProductForm from "./components/ProductForm";
import { LOCALSTORE_TOTALITEMS } from "./models/constants";
import productsData from "./data/products";

export const AuthContext = createContext(null)

function App() {
  const [products, setProducts] = useState(productsData);
  const [selectedId, setSelectedId] = useState(null);

  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem(LOCALSTORE_TOTALITEMS);
    if (savedCartItems) {
      return JSON.parse(savedCartItems);
    } else {
      const defaultProductSelections = [
        { id: 1, quantity: 1 }, // Ноутбук
        { id: 2, quantity: 1 }, // Принтер
        { id: 3, quantity: 1 }  // Монітор
      ];

      const initialCart = defaultProductSelections.map(itemSelection => {
        const product = productsData.find(p => p.id === itemSelection.id);
        if (product) {
          return { ...product, cartQuantity: itemSelection.quantity };
        }
        return null;
      }).filter(Boolean);

      return initialCart;
    }
  });

  const [currentUser, setCurrentUser] = useState(null);

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('app-theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    // Стиль теми додається до <body>
    document.body.className = theme === 'dark' ? 'dark-theme' : '';
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    localStorage.setItem(LOCALSTORE_TOTALITEMS, JSON.stringify(cartItems));
  }, [cartItems]);

  const addProductToList = (name, priceInput, quantityInput, warehouseInput, imageInput, descriptionInput) => {
    const newProduct = {
      id: Date.now(),
      name,
      quantity: parseInt(quantityInput) || 1,
      warehouse: warehouseInput || "Невідомо",
      price: parseFloat(priceInput) || 0,
      image: imageInput || "/images/unknown.jpg",
      description: descriptionInput || "Опис товару відсутній."
    };
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  const updateProductInList = (updatedProduct) => {
    setProducts(prevProducts =>
      prevProducts.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleSelectProductCard = (id) => {
    setSelectedId(id);
  };

  const deleteProductFromList = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== id));
  };

  const addToCart = (productToAdd) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === productToAdd.id);
    if (existingItemIndex > -1) {
      const updatedCartItems = cartItems.map((item, index) =>
        index === existingItemIndex
          ? { ...item, cartQuantity: (item.cartQuantity || 1) + 1 }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...productToAdd, cartQuantity: 1 }]);
    }
    setSelectedId(null);
  };

  const removeFromCart = (productIdToRemove) => {
    setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== productIdToRemove));
  };

  const updateCartQuantity = (productId, newQuantity) => {
    let quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 0) {
      quantity = 0;
    }

    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevCartItems =>
        prevCartItems.map(item =>
          item.id === productId ? { ...item, cartQuantity: quantity } : item
        )
      );
    }
  };

  const handlePlaceOrderLogic = () => {
    alert("Замовлення успішно оформлено!");
    setCartItems([]);
    return true;
  };

  const totalCartItemCount = cartItems.reduce((count, item) => count + (item.cartQuantity || 0), 0);

  const login = (username) => {
    setCurrentUser({ username });
    alert(`Користувач ${username} успішно увійшов!`);
  };

  const logout = () => {
    setCurrentUser(null);
    alert("Ви успішно вийшли з системи.");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      <BrowserRouter>
        <div className="page-wrapper container py-3">
          <Header
            totalCartItemCount={totalCartItemCount}
            toggleTheme={toggleTheme}
            currentTheme={theme}
          />

          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  products={products}
                  addProductToList={addProductToList}
                  updateProductInList={updateProductInList}
                  deleteProductFromList={deleteProductFromList}
                  addToCart={addToCart}
                  selectedId={selectedId}
                  handleSelectProductCard={handleSelectProductCard}
                />
              }
            />
            <Route
              path="/basket"
              element={
                <Basket
                  cartItems={cartItems}
                  onRemoveFromCart={removeFromCart}
                  onUpdateCartQuantity={updateCartQuantity}
                  onPlaceOrder={handlePlaceOrderLogic}
                />
              }
            />
            <Route path="/products/:id" element={<ProductDetailsPage products={products} onAddToCart={addToCart} onEdit={updateProductInList} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/order-history" element={<OrderHistoryPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;