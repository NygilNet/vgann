import React, { useState } from 'react';

const FilterForm = () => {
  const [openAt, setOpenAt] = useState('');
  const [delivery, setDelivery] = useState(false);
  const [category, setCategory] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data

  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="openAt">Open At:</label>
        <input
          type="text"
          id="openAt"
          value={openAt}
          onChange={(event) => setOpenAt(event.target.value)}
        />
        <span>(now)</span>
      </div>

      <div>
        <label htmlFor="delivery">
          <input
            type="checkbox"
            id="delivery"
            checked={delivery}
            onChange={(event) => setDelivery(event.target.checked)}
          />
          Offers Delivery
        </label>
      </div>

      <div>
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="">Select a category</option>
          <option value="burgers">Burgers</option>
          <option value="restaurants">Restaurants</option>
          <option value="food">Food</option>
          <option value="bars">Bars</option>
        </select>
      </div>

      </form>
    )}

    export default FilterForm
