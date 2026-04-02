import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from "../../components/Header";
import "./HomePage.css";
import { ProductsGrid } from './ProductsGrid';

export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    const response = await axios.get('/api/products');
    setProducts(response.data);
  }, []);

  return (
    <>
      <Header cart = {cart} />
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}
