import React, { useState, useEffect } from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import './ProductForm.css';

function ProductForm({ onAdd, onEdit, editingProduct }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
      setQuantity(editingProduct.quantity);
      setWarehouse(editingProduct.warehouse);
      setImage(editingProduct.image);
      setDescription(editingProduct.description);
    } else {
      // Clear form when no product is being edited
      setName("");
      setPrice("");
      setQuantity("");
      setWarehouse("");
      setImage("");
      setDescription("");
    }
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingProduct) {
      onEdit({
        ...editingProduct,
        name,
        price: parseFloat(price) || 0,
        quantity: parseInt(quantity) || 1,
        warehouse,
        image,
        description
      });
    } else {
      onAdd(name, price, quantity, warehouse, image, description);
    }

    // Clear form after submission
    setName("");
    setPrice("");
    setQuantity("");
    setWarehouse("");
    setImage("");
    setDescription("");
  };

  return (
    <div className="card product-form">
      <div className="card-header">
        {editingProduct ? "Редагувати товар" : "Додати новий товар"}
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <TextInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Назва товару"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <TextInput
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ціна"
              className="form-control"
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-3">
            <TextInput
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Кількість"
              className="form-control"
              min="0"
            />
          </div>
          <div className="mb-3">
            <TextInput
              value={warehouse}
              onChange={(e) => setWarehouse(e.target.value)}
              placeholder="Склад"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <TextInput
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Посилання на зображення (напр. /images/laptop.jpg)"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Опис товару"
              className="form-control"
              rows="3"
            ></textarea>
          </div>
          <Button
            label={editingProduct ? "Зберегти зміни" : "Додати товар"}
            onClick={handleSubmit}
            className="btn btn-primary w-100"
          />
        </form>
      </div>
    </div>
  );
}

export default ProductForm;