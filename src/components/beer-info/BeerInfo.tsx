import { useParams } from "react-router-dom";
import "./BeerInfo.css";
import SingleBeer from "./single-beer/SingleBeer";
import SuggestedBeers from "./suggested/SuggestedBeers";

function BeerInfo() {
  const { id } = useParams();

  return (
    <div>
      {id ? (
        <>
          <SingleBeer id={id} />
          <SuggestedBeers />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default BeerInfo;
