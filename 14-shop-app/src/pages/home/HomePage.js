import React from 'react';
import CardList from './card-list/CardList';
import CountProducts from './count-products/CountProducts';
import FiltersCategory from './filters-category/FiltersCategory';

function HomePage() {
  return (
    <div className="page">
      <div className="container">
        <h2>Products</h2>
        <FiltersCategory />
        <CountProducts />
        <CardList />
      </div>
    </div>
  );
}

export default HomePage;
