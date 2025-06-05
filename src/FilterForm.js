import React from 'react';

function FilterForm({ onFilterChange }) {
  return (
    <form>
      <select onChange={(e) => onFilterChange('warehouse', e.target.value)}>
        <option value="">Всі склади</option>
        <option value="Київ">Київ</option>
        <option value="Львів">Львів</option>
        <option value="Одеса">Одеса</option>
      </select>
      <input type="text" placeholder="Пошук за назвою" onChange={(e) => onFilterChange('name', e.target.value)} />
      {/* Інші фільтри */}
    </form>
  );
}

export default FilterForm;