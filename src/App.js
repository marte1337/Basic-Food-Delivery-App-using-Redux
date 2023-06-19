import React from "react";
import { useState } from "react";
import { useGetAllProductsQuery } from "./features/api/apiSlice";
import Header from "./components/Header";
import BottomNavigation from "./components/BottomNavigation";
import ProductCard from "./components/productcard/ProductCard";
import ShoppingCart from "./components/shoppingcart/ShoppingCart";
import "./App.css";

export default function App() {
  const { data, error, isLoading, isError } = useGetAllProductsQuery();
  const [visibleProducts, setVisibleProducts] = useState(5);

  const handleShowMoreProducts = () => {
    setVisibleProducts((prevState) => (prevState += 5));
  };

  console.log(data);

  return (
    <div className="App">
      <Header />
      <main className="App-main">
        <section className="product-section">
          <h2>Products:</h2>
          {isError ? (
            <>{error.error}</>
          ) : isLoading ? (
            <>Loading...</>
          ) : data ? (
            data
              .slice(0, visibleProducts)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
          ) : null}
          {data?.length > visibleProducts && (
            <button onClick={handleShowMoreProducts}>Show more</button>
          )}
        </section>
        <section className="cart-section">
          <h2>Shopping Cart:</h2>
          <ShoppingCart />
        </section>
      </main>
      <BottomNavigation />
    </div>
  );
}
