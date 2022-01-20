import { useEffect, useState } from "react";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import {
  GetBeers,
  InitialBeerState,
} from "../../app/features/beers/beersSlice";
import Beers from "./beers/Beers";
import { RootStore } from "../../app/store/store";
import {
  perPageDefaultValue,
  perPageRequestLimit,
} from "../../common/constants/constants";

function Home() {
  const dispatch = useDispatch();
  const [perPage, setPerPage] = useState<number>(perPageDefaultValue);
  const [query, setQuery] = useState("");

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", isScrolling);
  }, []);

  useEffect(() => {
    dispatch(GetBeers(perPage));
  }, [query]);

  useEffect(() => {
    if (!isFetching) return;
    const perPageNext = perPage + 9;
    setPerPage(
      perPageNext > perPageRequestLimit ? perPageRequestLimit : perPageNext
    );
    dispatch(GetBeers(perPage));
    setIsFetching(false);
  }, [isFetching]);

  const isScrolling = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    setIsFetching(true);
  };

  const beersState: InitialBeerState = useSelector((state: RootStore) => {
    return state.beers;
  });

  const { beers, loading } = beersState;

  return (
    <div className="home-container">
      <div className="beer-search-form">
        <input
          name="query"
          className="beer-search-form-query"
          value={query}
          onChange={(e) => {
            e.preventDefault();
            setQuery(e.target.value);
          }}
        />
      </div>
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
