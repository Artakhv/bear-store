import { useEffect, useState } from "react";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";
import {
  GetBeers,
  GetBeersBy,
  InitialBeerState,
} from "../../app/features/beers/beersSlice";
import Beers from "./beers/Beers";
import { RootStore } from "../../app/store/store";
import {
  brewedAfterDefaultValue,
  brewedBeforeDefaultValue,
  perPageDefaultValue,
  perPageRequestLimit,
} from "../../common/constants/constants";
import { toValidDateForRequest } from "../../common/util/util";

function Home() {
  const dispatch = useDispatch();
  const [perPage, setPerPage] = useState<number>(perPageDefaultValue);
  const [brewedBefore, setBrewedBefore] = useState(brewedBeforeDefaultValue);
  const [brewedAfter, setBrewedAfter] = useState(brewedAfterDefaultValue);
  const [query, setQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", isScrolling);
  }, []);

  useEffect(() => {
    dispatch(
      GetBeersBy(
        perPage,
        toValidDateForRequest(brewedAfter),
        toValidDateForRequest(brewedBefore),
        query
      )
    );
    setPerPage(perPageDefaultValue);
  }, [query, brewedAfter, brewedBefore]);

  useEffect(() => {
    if (!isFetching) return;
    const perPageNext = perPage + 9;
    setPerPage(
      perPageNext > perPageRequestLimit ? perPageRequestLimit : perPageNext
    );
    dispatch(
      GetBeersBy(
        perPage,
        toValidDateForRequest(brewedAfter),
        toValidDateForRequest(brewedBefore),
        query
      )
    );
    setIsFetching(false);
  }, [isFetching]);

  const isScrolling = () => {
    if (
      Math.floor(window.innerHeight + document.documentElement.scrollTop) !==
      Math.floor(document.documentElement.offsetHeight)
    ) {
      console.log(
        `${window.innerHeight}+${document.documentElement.scrollTop} ${
          window.innerHeight + document.documentElement.scrollTop
        } = ${document.documentElement.offsetHeight}`
      );
      return;
    }
    setIsFetching(true);
  };

  const beersState: InitialBeerState = useSelector((state: RootStore) => {
    return state.beers;
  });

  const { beers, loading } = beersState;

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "brewedAfter") {
      setBrewedAfter(value);
    } else if (name === "query") {
      setQuery(value);
    } else {
      setBrewedBefore(value);
    }
  };

  return (
    <div className="home-container">
      <div className="beer-search-form">
        <input
          name="query"
          className="beer-search-form-query"
          value={query}
          onChange={handleOnChange}
        />
      </div>
      <div className="brewed-before-after">
        <input
          type="date"
          name="brewedAfter"
          value={brewedAfter}
          onChange={handleOnChange}
        />
        <input
          type="date"
          name="brewedBefore"
          value={brewedBefore}
          onChange={handleOnChange}
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
