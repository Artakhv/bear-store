import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddCartItem } from "../../../app/features/cart/cartSlice";
import {
  GetSingleBeer,
  InitialSingleBeerState,
} from "../../../app/features/singleBeer/singleBeerSlice";
import { RootStore } from "../../../app/store/store";
import ErrorMessage from "../../../common/components/errorMessage/ErrorMessage";
import Loading from "../../../common/components/loading/Loading";
import {
  singleBeerErrorMessage,
  singleBeerErrorTitle,
} from "../../../common/constants/constants";
import { ISingleBeerPropsType } from "../../../common/types/SingleBeerPropsType";
import "./SingleBeer.css";

function SingleBeer(singleBeerProps: ISingleBeerPropsType) {
  const { id } = singleBeerProps;
  const dispatch = useDispatch();
  const singleBeerState: InitialSingleBeerState = useSelector(
    (state: RootStore) => {
      return state.singleBeer;
    }
  );

  useEffect(() => {
    dispatch(GetSingleBeer(id));
  }, [id, dispatch]);
  const { singleBeer, loading } = singleBeerState;

  const handleOnClick = (e: any) => {
    if (singleBeer) {
      const { id, name, image_url, tagline } = singleBeer;
      dispatch(AddCartItem({ id, name, count: 1, image_url, tagline }));
    }
  };

  return (
    <div>
      {" "}
      {loading ? (
        <Loading />
      ) : singleBeer ? (
        <div>
          <div className="single-beer-container">
            <div className="single-beer-image-container">
              <img src={singleBeer?.image_url} alt={singleBeer?.name} />{" "}
            </div>
            <div className="single-beer-content">
              <div>
                <div>
                  <h3>{singleBeer.name}</h3>
                </div>
                <div>
                  <h3>{singleBeer.tagline}</h3>
                </div>
                <div>
                  <p>{singleBeer.description}</p>
                </div>
                <div>
                  <button className="add-to-cart" onClick={handleOnClick}>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ErrorMessage
          errorMessage={singleBeerErrorMessage}
          errorMessageTitle={singleBeerErrorTitle}
        />
      )}
    </div>
  );
}

export default SingleBeer;
