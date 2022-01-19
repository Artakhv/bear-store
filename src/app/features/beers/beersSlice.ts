import { IBeer } from "../../../common/types/BeersTypes";
import { Dispatch } from 'redux';
import { getBeers, getBeersByName } from "../../../services/beersService";
import { perPageDefaultValue } from "../../../common/constants/constants";

export interface InitialBeerState {
    loading: boolean;
    beers?: IBeer[]
}

const initialState: InitialBeerState = {
    loading: false
}

export const BEERS_SUCCESS = 'BEERS_SUCCESS';
export const BEERS_LOADING = 'BEERS_LOADING';
export const BEERS_FAIL = 'BEERS_FAIL';

export interface BeerLoading {
    type: typeof BEERS_LOADING;
}

export interface BeerFail {
    type: typeof BEERS_FAIL;
}

export interface BeerSucess {
    type: typeof BEERS_SUCCESS;
    payload: {
        beers: IBeer[];
    };
}

export function GetBeers(perPage: number = perPageDefaultValue) { /// todo
    return async function (dispatch: Dispatch) {
        dispatch({
            type: BEERS_LOADING
        });

        getBeers(perPage)
            .then(res => {
                dispatch({
                    type: BEERS_SUCCESS,
                    payload: res.data
                })
            })
            .catch((e) => {
                dispatch({
                    type: BEERS_FAIL
                })
            });
    }
}


export function GetBeersByName(byName: string) {
    return async function (dispatch: Dispatch) {
        dispatch({
            type: BEERS_LOADING
        });

        getBeersByName(byName)
            .then(res => {
                dispatch({
                    type: BEERS_SUCCESS,
                    payload: res.data
                })
            })
            .catch((e) => {
                dispatch({
                    type: BEERS_FAIL
                })
            });
    }
}



export function BeersReducer(state: InitialBeerState = initialState, action: BeerFail | BeerLoading | BeerSucess) {
    switch (action.type) {
        case BEERS_FAIL:
            {
                return {
                    loading: false
                }
            }
        case BEERS_LOADING: {
            return {
                loading: true
            }
        }
        case BEERS_SUCCESS: {
            return {
                loading: false,
                beers: action.payload
            }
        }
        default: {
            return state
        }

    }
}

