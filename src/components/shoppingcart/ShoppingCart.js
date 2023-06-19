import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../../features/shoppingCartSlice";
import "./ShoppingCart.css";

export default function ShoppingCart() {
  const cartItems = useSelector((state) => state.shoppingCart.items);
  const dispatch = useDispatch();

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  console.log(cartItems);

  return (
    <div className="shopping-cart">
      <div>
        {cartItems.length === 0 ? (
          "No items added to cart."
        ) : (
          <ul>
            {cartItems.map((product) => (
              <li className="shopping-cart__item" key={product.id}>
                <h3>{product.name}</h3>
                <h4>Price: {product.price} EUR</h4>

                <div>
                  <h4>Ingredients:</h4>
                  <ul>
                    {product.ingredients.map((ingr, index) => (
                      <li key={index}>{ingr}</li>
                    ))}
                  </ul>
                </div>

                <button onClick={() => handleRemoveItem(product.id)}>
                  Remove Item
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
