import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { BeersReducer } from '../features/beers/beersSlice';
import { CartReducer } from '../features/cart/cartSlice';
import { SingleBeerReducer } from '../features/singleBeer/singleBeerSlice';
import { SuggestedBeersReducer } from '../features/suggestedBeers/suggestedBeers';

const RootReducer = combineReducers({
  beers: BeersReducer,
  singleBeer: SingleBeerReducer,
  suggestedBeer: SuggestedBeersReducer,
  cart: CartReducer
});

const Store = createStore(
  RootReducer,
  (applyMiddleware(thunk))
);

export type RootStore = ReturnType<typeof RootReducer>;


export default Store;