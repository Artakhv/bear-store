import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { InitialCartState } from "../../app/features/cart/cartSlice";
import { RootStore } from "../../app/store/store";
import "./Header.css";

function Header() {
  const cartState: InitialCartState = useSelector((state: RootStore) => {
    return state.cart;
  });

  return (
    <>
      <div className="navbar">
        <div className="navbar-container">
          <div>
            <Link to="/">
              <div className="navbar-item"> Home </div>
            </Link>
          </div>
          <div>
            <Link to="/cart">
              <div className="navbar-item"> Cart ( {cartState.cartBeers.length} )</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="header"></div>
    </>
  );
}

export default Header;
