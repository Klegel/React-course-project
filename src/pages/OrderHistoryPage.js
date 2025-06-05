import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../App"; // Import AuthContext
import { useNavigate } from "react-router-dom"; // <--- Переконайтесь, що це імпортовано

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate(); // <--- Переконайтесь, що це ініціалізовано

  useEffect(() => {
    if (!currentUser) {
      navigate("/login"); // Redirect if not logged in
      return;
    }
    const savedOrders = localStorage.getItem(`userOrders_${currentUser.username}`);
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return (
      <div className="text-center mt-5">
        <p>Будь ласка, увійдіть, щоб переглянути історію замовлень.</p>
        <button className="btn btn-primary" onClick={() => navigate("/login")}>Увійти</button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-5">
        <h2>Історія замовлень</h2>
        <p>У вас ще немає жодних замовлень.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Історія замовлень</h2>
      {orders.map((order) => (
        <div key={order.id} className="card mb-3 shadow-sm">
          <div className="card-header bg-light">
            <strong>Замовлення #{order.id}</strong>
            <span className="float-end">Дата: {new Date(order.date).toLocaleDateString()}</span>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              {order.items.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    {item.name} <small className="text-muted">x {item.cartQuantity}</small>
                  </div>
                  <span>{item.price * item.cartQuantity} грн</span>
                </li>
              ))}
            </ul>
            <div className="text-end mt-3">
              <h5>Загальна сума замовлення: <span className="fw-bold">{order.totalPrice.toFixed(2)} грн</span></h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderHistoryPage;