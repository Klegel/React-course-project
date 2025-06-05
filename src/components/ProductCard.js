import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ card, isSelected, onSelect, onDelete, onAddToCart }) => {
  const { name, quantity, warehouse, image, id, price, description } = card;

  return (
    <div
      className={`card h-100 product-card ${isSelected ? "selected" : ""}`}
    >
      <Link to={`/products/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={image} className="card-img-top" alt={name} style={{ maxHeight: '150px', objectFit: 'contain', paddingTop: '10px' }}/>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{name}</h5>
          <p className="card-text"><small>Склад: {warehouse}</small></p>
          <p className="card-text fw-bold">Ціна: {price} грн</p>
          <p className="card-text"><small>На складі: {quantity}</small></p>
        </div>
      </Link>

      <div className="card-footer bg-transparent border-top-0 mt-auto">
        <button
          className="btn btn-success btn-sm w-100 mb-2"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(card);
          }}
          disabled={quantity <= 0}
        >
          {quantity > 0 ? 'Додати в корзину' : 'Немає в наявності'}
        </button>

        {isSelected && (
          <div className="alert alert-info mt-2 p-2 small">✔ Вибрано для деталей</div>
        )}
        <button
          className="btn btn-outline-secondary btn-sm w-100 mb-1"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(id);
          }}
        >
          Деталі / Редагувати
        </button>
        <button
          className="btn btn-danger btn-sm w-100"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id); // <--- ЗМІНЕНО: Викликаємо onDelete (який тепер є handleDeleteClick з HomePage)
          }}
        >
          Видалити
        </button>
      </div>
    </div>
  );
};

export default ProductCard;