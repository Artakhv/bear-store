import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  GetBeers,
  GetBeersByName,
} from "../../../app/features/beers/beersSlice";
import "./BeerSearchForm.css";

function BeerSearchForm() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (query) dispatch(GetBeersByName(query));
    else dispatch(GetBeers()); /// todo
  }, [query, dispatch]);

  return (
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
  );
}

export default BeerSearchForm;
