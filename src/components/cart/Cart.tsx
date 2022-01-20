import { useSelector } from "react-redux";
import { InitialCartState } from "../../app/features/cart/cartSlice";
import { RootStore } from "../../app/store/store";
import CartItem from "./cart-item/CartItem";
import "./Cart.css";

function Cart() {
  const cartState: InitialCartState = useSelector((state: RootStore) => {
    return state.cart;
  });
  const { cartBeers } = cartState;
  return (
    <div className="cart-container">
      {cartBeers.map((cartBeer) => {
        return <CartItem cartItem={cartBeer} key={cartBeer.id} />;
      })}
    </div>
  );
}

export default Cart;