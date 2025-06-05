import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm"; // Import ProductForm for editing

const ProductDetailsPage = ({ products, onAddToCart, onEdit }) => {
  const { id } = useParams(); // Get product ID from URL params
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Find the product by ID
    const foundProduct = products.find((p) => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // If product not found, redirect to home or show a 404
      navigate("/");
    }
  }, [id, products, navigate]);

  const handleEditSubmit = (updatedProduct) => {
    onEdit(updatedProduct); // Call the edit function passed from App.js
    setIsEditing(false); // Exit editing mode
    setProduct(updatedProduct); // Update local state for immediate display
  };

  if (!product) {
    return <div className="text-center mt-5">Завантаження... або товар не знайдено.</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 text-end mb-3">
          <button onClick={() => navigate(-1)} className="btn btn-outline-secondary">
            &larr; Назад до товарів
          </button>
        </div>
      </div>

      {!isEditing ? (
        <div className="card product-detail-card mb-4">
          <div className="row g-0">
            <div className="col-md-5 d-flex justify-content-center align-items-center p-3">
              <img src={product.image} className="img-fluid product-detail-image" alt={product.name} />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <h2 className="card-title text-primary">{product.name}</h2>
                <p className="card-text lead">{product.description}</p>
                <p className="card-text fs-5">
                  <strong>Ціна:</strong> <span className="text-success fw-bold">{product.price.toFixed(2)} грн</span>
                </p>
                <p className="card-text">
                  <strong>На складі:</strong> {product.quantity > 0 ? product.quantity : "Немає в наявності"}
                </p>
                <p className="card-text">
                  <strong>Склад:</strong> {product.warehouse}
                </p>
                <div className="d-grid gap-2 mt-4">
                  <button
                    className="btn btn-lg btn-success"
                    onClick={() => onAddToCart(product)}
                    disabled={product.quantity <= 0}
                  >
                    {product.quantity > 0 ? 'Додати в корзину' : 'Немає в наявності'}
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Редагувати товар
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-4">
          <ProductForm
            onAdd={() => {}} // Not adding here, only editing
            onEdit={handleEditSubmit}
            editingProduct={product}
          />
          <button className="btn btn-secondary mt-3" onClick={() => setIsEditing(false)}>
            Скасувати редагування
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;