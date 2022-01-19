import { useDispatch } from "react-redux";
import {
  AddCartItem,
  CartBeer,
  DeleteCartItem,
  DeleteCartItemFull,
} from "../../../app/features/cart/cartSlice";
import "./CartItem.css";

export interface ICartItemPropType {
  cartItem: CartBeer;
}

function CartItem({ cartItem }: ICartItemPropType) {
  const dispatch = useDispatch();
  const { id, image_url, count, name, tagline } = cartItem;
  return (
    <div className="cart-item">
      <div className="cart-item-image-container">
        <img src={image_url} />
      </div>
      <div className="cart-item-add-delete">
        <button onClick={(e) => dispatch(DeleteCartItem(id))}>-</button>{" "}
        <span> {count} </span>
        <button onClick={(e) => dispatch(AddCartItem(cartItem))}>+</button>
      </div>
      <div className="cart-item-name-tagline">
        <div>{name}</div>
        <div className="italic">{tagline}</div>
      </div>
      <div className="cart-delete">
        <button onClick={(e) => dispatch(DeleteCartItemFull(id))}>
          X
        </button>
      </div>
    </div>
  );
}

export default CartItem;
