import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InitialSingleBeerState } from "../../../app/features/singleBeer/singleBeerSlice";
import {
  GetSingleBeerSuggestedItems,
  InitialSuggestedBeerState,
} from "../../../app/features/suggestedBeers/suggestedBeers";
import { RootStore } from "../../../app/store/store";
import BeerItem from "../../home/beer-item/BeerItem";
import "./SuggestedBeers.css";

function SuggestedBeers() {
  const dispatch = useDispatch();
  const suggestedBeer: InitialSuggestedBeerState = useSelector(
    (state: RootStore) => {
      return state.suggestedBeer;
    }
  );

  const singleBeerState: InitialSingleBeerState = useSelector(
    (state: RootStore) => state.singleBeer
  );

  useEffect(() => {
    if (singleBeerState.singleBeer?.abv && singleBeerState.singleBeer?.ibu)
      ///todo
      dispatch(
        GetSingleBeerSuggestedItems(
          singleBeerState.singleBeer?.abv,
          singleBeerState.singleBeer?.ibu
        )
      );
  }, [singleBeerState]);
  const { loading, suggestedBeers } = suggestedBeer;
  const selectedBeer = singleBeerState.singleBeer?.id;
  return (
    <div>
      {loading ? (
        loading
      ) : (
        <div className="suggested-list-container">
          {suggestedBeers?.map((suggeBeer) => {
            return (
              selectedBeer !== suggeBeer.id && (
                <BeerItem beer={suggeBeer} key={suggeBeer.id} />
              )
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SuggestedBeers;
