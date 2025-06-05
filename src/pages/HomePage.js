// src/pages/HomePage.js
import React, { useState, useEffect, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import TextInput from "../components/TextInput";
import "./HomePage.css"; // Переконайтеся, що цей імпорт є

const HomePage = ({
  products,
  addProductToList,
  updateProductInList,
  deleteProductFromList,
  addToCart,
  selectedId,
  handleSelectProductCard
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [warehouseFilter, setWarehouseFilter] = useState("all");

  const [showFilterSection, setShowFilterSection] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);

  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState(null);

  const availableWarehouses = useMemo(() => {
    const warehouses = new Set(products.map(p => p.warehouse));
    return ["all", ...Array.from(warehouses)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMinPrice = minPrice === "" || product.price >= parseFloat(minPrice);
      const matchesMaxPrice = maxPrice === "" || product.price <= parseFloat(maxPrice);
      const matchesWarehouse = warehouseFilter === "all" || product.warehouse === warehouseFilter;
      return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesWarehouse;
    });
  }, [products, searchTerm, minPrice, maxPrice, warehouseFilter]);

  const resetFilters = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setWarehouseFilter("all");
  };

  const handleDeleteClick = (productId) => {
    setProductToDeleteId(productId);
    setShowDeleteConfirmModal(true);
  };

  const confirmDelete = () => {
    if (productToDeleteId) {
      deleteProductFromList(productToDeleteId);
      setProductToDeleteId(null);
    }
    setShowDeleteConfirmModal(false);
  };

  const cancelDelete = () => {
    setProductToDeleteId(null);
    setShowDeleteConfirmModal(false);
  };

  return (
    <div className="page-wrapper">
      {/* <---- Заголовок та кнопки "Показати фільтри" / "Додати товар" ----> */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Наші товари</h2>
        <div>
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => setShowFilterSection(!showFilterSection)}
            aria-expanded={showFilterSection}
            aria-controls="filterSection"
          >
            {showFilterSection ? 'Приховати фільтри' : 'Показати фільтри'}
          </button>
          <button
            className="btn btn-success" // <--- ЗМІНЕНО: тепер це btn-success
            onClick={() => setShowProductForm(!showProductForm)}
            aria-expanded={showProductForm}
            aria-controls="productFormSection"
          >
            {showProductForm ? 'Приховати форму товару' : 'Додати новий товар'}
          </button>
        </div>
      </div>
      {/* <---- Кінець заголовку та кнопок ----> */}

      {/* <---- Секція фільтрів ----> */}
      <div className={`collapse ${showFilterSection ? 'show' : ''}`} id="filterSection">
        <div className="card shadow-sm p-4 mb-4">
          <h4 className="mb-4">Фільтри та пошук</h4>
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <TextInput
                className="form-control"
                placeholder="Пошук за назвою"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <TextInput
                type="number"
                className="form-control"
                placeholder="Ціна від"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <TextInput
                type="number"
                className="form-control"
                placeholder="Ціна до"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <select
                className="form-select"
                value={warehouseFilter}
                onChange={(e) => setWarehouseFilter(e.target.value)}
              >
                <option value="all">Усі склади</option>
                {availableWarehouses.map(warehouse => (
                  <option key={warehouse} value={warehouse}>
                    {warehouse === "all" ? "Усі склади" : warehouse}
                  </option>
                ))}
            </select>
          </div>
          <div className="col-md-6 d-flex align-items-end">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={resetFilters}
            >
              Скинути фільтри
            </button>
          </div>
        </div>
      </div>
      </div>
      {/* <---- Кінець секції фільтрів ----> */}

      {/* <---- Секція форми додавання товару ----> */}
      <div className={`collapse ${showProductForm ? 'show' : ''}`} id="productFormSection">
        <div className="card shadow-sm p-4 mb-4 product-form-card">
            <h4 className="mb-4">Додати новий товар</h4>
            <ProductForm onAdd={addProductToList} onEdit={updateProductInList} editingProduct={null} />
        </div>
      </div>
      {/* <---- Кінець секції форми додавання товару ----> */}

      {/* Product List */}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
              <ProductCard
                card={product}
                isSelected={product.id === selectedId}
                onSelect={handleSelectProductCard}
                onDelete={handleDeleteClick}
                onAddToCart={addToCart}
              />
            </div>
          ))
        ) : (
          <div className="col-12 text-center alert alert-info">
            Немає товарів, що відповідають вашим критеріям пошуку/фільтрації.
          </div>
        )}
      </div>

      {/* --- МОДАЛЬНЕ ВІКНО ПІДТВЕРДЖЕННЯ ВИДАЛЕННЯ --- */}
      {showDeleteConfirmModal && (
        <div className="modal show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Підтвердіть видалення</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={cancelDelete}></button>
              </div>
              <div className="modal-body">
                Ви впевнені, що хочете видалити цей товар? Цю дію неможливо буде скасувати.
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancelDelete}>Скасувати</button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Видалити</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDeleteConfirmModal && <div className="modal-backdrop fade show"></div>}

    </div>
  );
};

export default HomePage;