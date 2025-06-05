// src/components/Basket.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Імпорт useNavigate
import './Basket.css';

const Basket = ({ cartItems, onRemoveFromCart, onUpdateCartQuantity, onPlaceOrder }) => {
  const navigate = useNavigate(); // <<< ДОДАНО: Ініціалізація useNavigate

  const totalCartPrice = cartItems.reduce((sum, item) => {
    return sum + (item.price * item.cartQuantity);
  }, 0);

  // Нова функція, яка обробляє клік по кнопці "Оформити замовлення"
  const handlePlaceOrderClick = () => {
    const orderProcessed = onPlaceOrder(); // Викликаємо функцію з App.js
    if (orderProcessed) {
      // Якщо замовлення успішно оброблено (користувач був увійшов)
      navigate("/order-history");
    } else {
      // Якщо користувач не увійшов
      navigate("/login");
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="card shadow">
        <div className="card-body text-center">
          <h2 className="card-title mb-3">Кошик</h2>
          <p className="card-text fs-5">Ваш кошик порожній.</p>
          {/* Використовуємо Link або navigate для переходу до товарів */}
          <button onClick={() => navigate("/")} className="btn btn-outline-primary mt-3"> {/* Змінено на navigate */}
            Перейти до товарів
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="card-title mb-0">Кошик</h2>
          {/* Використовуємо Link або navigate для переходу до товарів */}
          <button onClick={() => navigate("/")} className="btn btn-sm btn-outline-secondary"> {/* Змінено на navigate */}
            &larr; Продовжити покупки
          </button>
        </div>
        {cartItems.map(item => (
          <div key={item.id} className="row align-items-center mb-3 border-bottom pb-3">
            <div className="col-3 col-md-2">
              <img src={item.image} alt={item.name} className="img-fluid rounded" />
            </div>
            <div className="col-5 col-md-6">
              <h5 className="mb-1">{item.name}</h5>
              <p className="mb-0 text-muted">{item.price} грн / шт.</p>
            </div>
            <div className="col-2 col-md-2 d-flex justify-content-center align-items-center">
              <div className="input-group input-group-sm">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => onUpdateCartQuantity(item.id, item.cartQuantity - 1)}
                  disabled={item.cartQuantity <= 1} // Деактивуємо, якщо кількість 1
                >
                  -
                </button>
                <input
                  type="number"
                  min="0"
                  value={item.cartQuantity || ''} // Якщо 0, показуємо порожній рядок, щоб можна було видалити
                  onChange={(e) => {
                    // Передаємо сире значення в App.js для обробки
                    onUpdateCartQuantity(item.id, e.target.value);
                  }}
                  className="form-control text-center"
                  style={{ minWidth: '40px' }}
                  aria-label={`Quantity for ${item.name}`}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => onUpdateCartQuantity(item.id, item.cartQuantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-2 col-md-2 text-end">
              <button
                className="btn btn-link text-danger p-0"
                onClick={() => onRemoveFromCart(item.id)}
                title="Видалити товар"
                aria-label={`Видалити ${item.name}`}
              >
                &times;
              </button>
            </div>
          </div>
        ))}
        <hr />
        <div className="text-end">
          <h4>Загальна сума: <span className="fw-bold">{totalCartPrice.toFixed(2)} грн</span></h4>
          {/* Викликаємо нову функцію при кліку */}
          <button className="btn btn-lg btn-primary mt-3 w-100" onClick={handlePlaceOrderClick}>Оформити замовлення</button>
        </div>
      </div>
    </div>
  );
};

export default Basket;