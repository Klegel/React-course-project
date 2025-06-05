// src/components/ProductList.js
import ProductItem from './ProductItem';

function ProductList({ products, onDelete }) {
  return (
    <div className="mt-3">
      {products.map((p) => (
        <ProductItem key={p.id} product={p} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default ProductList;
