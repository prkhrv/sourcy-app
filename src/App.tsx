import React, { useState } from 'react';
import SearchResultsGrid from './pages/SearchResults';
import SearchBar from './pages/SearchBar';
import RecommendationSection from './pages/RecommendationSection';


export type Product = {
  product_id: number;
  title_translated: string;
  gpt_description: string;
  image_urls: string;
};

const apiUrl = import.meta.env.VITE_API_URL;

const uniqueRecommendations = (arr: Product[]) => {
  const seen = new Set();
  return arr.filter((item: Product) => {
    return !seen.has(item.product_id) && seen.add(item.product_id);
  });
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  // const recommendationSectionRef = useRef<HTMLDivElement>(null);

  const fetchData = async (searchTerm: string) => {

    // console.log(apiUrl);
    // reset related products
    setRelatedProducts([]);

    // fetch products by search term
    const response = await fetch(
      `${apiUrl}/api/search?searchTerm=${searchTerm}`
    );

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    setProducts(data);

    if(data.length > 0){
      const recommendations = [];
      for (const product of data) {
        const relatedProducts = await fetchRelatedProducts(product.product_id);
        recommendations.push(...relatedProducts);
      }
      setRelatedProducts(uniqueRecommendations(recommendations));
    }

  };

  const fetchRelatedProducts = async (product_id: string) => {
    // reset related products
    setRelatedProducts([]);

    // fetch related products
    const response = await fetch(
      `${apiUrl}/api/recommendations?productId=${product_id}`
    );

    if (!response.ok) {
      return;
    }

    const data = await response.json();
    return data;
    // setRelatedProducts(data);
  };


  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="w-full p-4 bg-black text-white text-center text-2xl font-bold">
        Sourcy - App
      </header>
      <SearchBar fetchData={fetchData} />
      <div className="w-full px-8 mt-8">
        <SearchResultsGrid products={products} />
        {products.length > 0 && (
          <RecommendationSection recommendedProducts={relatedProducts} />
        )}
      </div>
    </div>
  );
};

export default App;
