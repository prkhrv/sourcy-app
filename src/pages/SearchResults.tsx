import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../App';



interface SearchResultsGridProps {
  products: Product[];
}

const SearchResultsGrid: React.FC<SearchResultsGridProps> = ({ products }) => {
  return (
    <div className="p-8 bg-gray-100">
      <h2 className="text-3xl font-bold text-black mb-8">Search Results</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 && (
          <p className="text-gray-600">No products found.</p>
        )}
        {/* Render product cards here */}
        {products.map((product) => (
          <ProductCard
            key={product.product_id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResultsGrid;
