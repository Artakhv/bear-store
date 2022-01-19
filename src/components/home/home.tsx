import { useEffect, useState } from "react";
import "./home.css";
import BeerSearchForm from "./beer-search-form/BeerSearchForm";
import { useDispatch, useSelector } from "react-redux";
import {
  GetBeers,
  InitialBeerState,
} from "../../app/features/beers/beersSlice";
import Beers from "./beers/Beers";
import { RootStore } from "../../app/store/store";
import { perPageDefaultValue } from "../../common/constants/constants";

function Home() {
  const dispatch = useDispatch();
  const [perPage, setPerPage] = useState<number>(perPageDefaultValue); // todo

  useEffect(() => {
    dispatch(GetBeers(perPage));
    window.addEventListener("scroll", isScrolling);
  }, [perPage, dispatch]);

  const isScrolling = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    setPerPage(perPage + 9);
  };

  const beersState: InitialBeerState = useSelector((state: RootStore) => {
    return state.beers;
  });

  const { beers, loading } = beersState;

  return (
    <div className="home-container">
      <BeerSearchForm />
      {loading ? (
        <p>loading...</p>
      ) : (
        <div>
          <div>{beers && <Beers beersList={beers} />}</div>
        </div>
      )}
    </div>
  );
}

export default Home;
