import React, { useState, useContext } from "react";
import { AuthContext } from "../App"; // Import AuthContext
import { useNavigate, Link } from "react-router-dom"; // <--- ДОДАНО: Імпорт Link

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext); // Get login function from context
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!username || !password) {
      setError("Будь ласка, введіть ім'я користувача та пароль.");
      return;
    }

    // Simulate login
    const isLoggedIn = login(username, password);

    if (isLoggedIn) {
      navigate("/"); // Redirect to home on successful login
    } else {
      setError("Невірне ім'я користувача або пароль.");
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Вхід</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Ім'я користувача:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Пароль:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary w-100 mt-3">
          Увійти
        </button>
      </form>
      <p className="text-center mt-3">
        Ще не маєте облікового запису? <Link to="/register">Зареєструватися</Link>
      </p>
    </div>
  );
};

export default LoginPage;