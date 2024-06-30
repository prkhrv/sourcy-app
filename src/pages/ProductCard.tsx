import React from 'react';
import { Product } from '../App';


const extractFirstImageUrl = (urlsString: string) => {
    // Remove the surrounding braces
    const trimmedString = urlsString.slice(1, -1);
  
    // Split the string by commas
    const urlsArray = trimmedString.split(",");
  
    // Return the first URL
    return urlsArray[0];
  };


interface ProductItemProps {
    product: Product;

}

const ProductCard = ({ product }:ProductItemProps) => {
    const { product_id, title_translated, gpt_description, image_urls } = product;

    const firstImageUrl = extractFirstImageUrl(image_urls);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
      <img src={firstImageUrl} alt={title_translated} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold text-black">{title_translated}</h3>
        <p className="text-gray-700 mt-2">{gpt_description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
