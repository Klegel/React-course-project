import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!username || !email || !password || !confirmPassword) {
      setError("Будь ласка, заповніть всі поля.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Паролі не співпадають.");
      return;
    }

    if (password.length < 6) {
      setError("Пароль має бути не менше 6 символів.");
      return;
    }

    // Simulate registration success (in a real app, this would be an API call)
    setSuccess("Реєстрація пройшла успішно! Тепер ви можете увійти.");
    setTimeout(() => {
      navigate("/login"); // Redirect to login after successful registration
    }, 2000);
  };

  return (
    <div className="auth-form-container">
      <h2>Реєстрація</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="reg-username" className="form-label">
            Ім'я користувача:
          </label>
          <input
            type="text"
            className="form-control"
            id="reg-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="reg-email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="reg-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="reg-password" className="form-label">
            Пароль:
          </label>
          <input
            type="password"
            className="form-control"
            id="reg-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            Підтвердіть пароль:
          </label>
          <input
            type="password"
            className="form-control"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <button type="submit" className="btn btn-primary w-100 mt-3">
          Зареєструватися
        </button>
      </form>
      <p className="text-center mt-3">
        Вже маєте обліковий запис? <Link to="/login">Увійти</Link>
      </p>
    </div>
  );
};

export default RegisterPage;