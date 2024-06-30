import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../App';



interface RecommendationSectionProps {
  recommendedProducts: Product[];
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({ recommendedProducts }) => {
  return (
    <div className="p-8 bg-gray-100 mt-8">
      <h2 className="text-3xl font-bold text-black mb-8">Recommended for You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendedProducts.length === 0 && (
          <p className="text-gray-500">No recommended products found.</p>
        )}
        {/* Render product cards for recommended products */}
        {recommendedProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendationSection;
