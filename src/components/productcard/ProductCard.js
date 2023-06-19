import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addItem } from "../../features/shoppingCartSlice";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const [showIngredients, setShowIngredients] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  function handleSelectedIngedients(ingr) {
    if (selectedIngredients.includes(ingr)) {
      setSelectedIngredients((prevState) =>
        prevState.filter((prevIngr) => prevIngr !== ingr)
      );
    } else {
      setSelectedIngredients((prevState) => [...prevState, ingr]);
    }
  }

  const handleAddItem = () => {
    const individialProduct = {
      id: uuidv4(),
      name: product.name,
      price: product.price,
      ingredients: selectedIngredients,
      //   ingredients: product.ingredients,
    };
    dispatch(addItem(individialProduct));
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <h4>Price: {product.price} EUR</h4>
      <button onClick={() => setShowIngredients(!showIngredients)}>
        {showIngredients ? "Hide" : "Edit"} Ingredients
      </button>
      {showIngredients && (
        <div>
          <h4>Ingredients:</h4>
          <ul>
            {product.ingredients.map((ingr, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  id={ingr}
                  onChange={() => handleSelectedIngedients(ingr)}
                ></input>
                <label htmlFor={ingr}>{ingr}</label>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={handleAddItem}>Add to Cart</button>
    </div>
  );
}
