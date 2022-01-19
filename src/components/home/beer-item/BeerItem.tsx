import { Link } from "react-router-dom";
import { IBeerItemPropType } from "../../../common/types/BeerItemPropsType";
import "./BeerItem.css"

function BeerItem(beerItemProps: IBeerItemPropType) {
  const beer = beerItemProps.beer;
  return (
    <div className="beer-item-container">
      <Link to={`/beer-info/${beer.id}`}>
        <div className="beer-item">
            <div className="beer-item-img-container">
                <img  src={beer.image_url} alt={beer.name} />
            </div>
          <div className="beer-item-name">{beer.name}</div>
        </div>
      </Link>
    </div>
  );
}

export default BeerItem;
