import { IBeersPropsType } from "../../../common/types/BeersPropsType";
import BeerItem from "../beer-item/BeerItem";
import "./Beers.css";

function Beers(beersProps: IBeersPropsType) {
  const beers = beersProps.beersList;
  return (
    <div className="beers-list-container">
      {beers && beers.map((beer) => {
        return <BeerItem beer={beer} key={beer.id} />;
      })}
    </div>
  );
}

export default Beers;
