import { Dispatch } from "redux";

export interface CartBeer {
    id: number;
    name: string;
    count: number;
    image_url: string;
    tagline: string;
}

const cartItemsFromStorage: CartBeer[] = localStorage.getItem("beerShopCartItems")
    // @ts-ignore
    ? JSON.parse(localStorage.getItem("beerShopCartItems"))
    : [];

export interface InitialCartState {
    cartBeers: CartBeer[]
}

const initialState: InitialCartState = {
    cartBeers: cartItemsFromStorage
}

export const ADD_CART_ITEM = "ADD_CART_ITEM";
export const DELETE_CART_ITEM = "DELETE_CART_ITEM";
export const DELETE_CART_ITEM_FULL = "DELETE_CART_ITEM_FULL";

export interface IAddCartItem {
    type: typeof ADD_CART_ITEM;
    payload: {
        cartBeer: CartBeer;
        count: number;
    };
}

export interface IDeleteCartItem {
    type: typeof DELETE_CART_ITEM;
    payload: {
        id: number;
        count: number;
    }
}

export interface IDeleteCartItemFull {
    type: typeof DELETE_CART_ITEM_FULL;
    payload: {
        id: number;
    }
}



export function AddCartItem(cartBeer: CartBeer, count: number = 1) {
    return function (dispatch: Dispatch, getState: Function) {
        dispatch({
            type: ADD_CART_ITEM,
            payload: { cartBeer, count }
        });
        localStorage.setItem('beerShopCartItems', JSON.stringify(getState().cart.cartBeers));
    }
}

export function DeleteCartItem(id: number, count: number = 1) {
    return function (dispatch: Dispatch, getState: Function) {
        dispatch({
            type: DELETE_CART_ITEM,
            payload: { id, count }
        });
        localStorage.setItem('beerShopCartItems', JSON.stringify(getState().cart.cartBeers));
    }
}

export function DeleteCartItemFull(id: number) {
    return function (dispatch: Dispatch, getState: Function) {
        dispatch({
            type: DELETE_CART_ITEM_FULL,
            payload: { id }
        });
        localStorage.setItem('beerShopCartItems', JSON.stringify(getState().cart.cartBeers));
    }
}



export function CartReducer(state: InitialCartState = initialState, action: IAddCartItem | IDeleteCartItem | IDeleteCartItemFull) {
    switch (action.type) { //// TODO BEAUTIFY
        case ADD_CART_ITEM: {
            const { cartBeer } = action.payload;
            const existItem = state.cartBeers.find(
                (beer) => {
                    return beer.id === cartBeer.id;
                }
            );
            if (existItem) {
                return {
                    cartBeers: state.cartBeers.map(beer => {
                        return beer.id === existItem.id ? { ...cartBeer, count: existItem.count + 1 }
                            : beer
                    })
                }
            }
            else {
                return {
                    cartBeers: [...state.cartBeers, action.payload.cartBeer],
                }
            }

        }
        case DELETE_CART_ITEM: {
            const { id, count } = action.payload;
            return {
                cartBeers: state.cartBeers.map(cartBeer => {
                    return cartBeer.id === id ? { ...cartBeer, count: cartBeer.count ? cartBeer.count - count : cartBeer.count } : cartBeer
                })
            }
        }
        case DELETE_CART_ITEM_FULL: {
            const { id } = action.payload;
            return {
                cartBeers: state.cartBeers.filter(cartBeer => cartBeer.id !== id)
            }
        }
        default: {
            return state;
        }

    }
}




