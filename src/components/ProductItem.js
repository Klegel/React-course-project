// src/components/ProductItem.js
import { LOCALSTORE_TOTALITEMS } from "../models/constants";

function ProductItem({ product, onDelete }) {
  const addToLocalStorage = (item) => {
    let items = window.localStorage.getItem(LOCALSTORE_TOTALITEMS);
    items = items ? JSON.parse(items) : [];
    items.push(item);
    window.localStorage.setItem(LOCALSTORE_TOTALITEMS, JSON.stringify(items));
  };

  return (
    <div className="card mb-2 shadow-sm">
      <div className="card-body d-flex justify-content-between align-items-center">
        <span className="fw-bold">{product.name}</span>
        <div>
          <button className="btn btn-danger btn-sm me-2" onClick={() => onDelete(product.id)}>
            Видалити
          </button>
          <button className="btn btn-success btn-sm" onClick={() => addToLocalStorage(product)}>
            Додати до кошика
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
