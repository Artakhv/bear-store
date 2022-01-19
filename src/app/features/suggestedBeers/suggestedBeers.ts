import { IBeer } from "../../../common/types/BeersTypes";
import { Dispatch } from 'redux';
import { getBeersByName, getSingleBeerSuggestedItems } from "../../../services/beersService";

export interface InitialSuggestedBeerState {
    loading: boolean;
    suggestedBeers?: IBeer[]
}

const initialState: InitialSuggestedBeerState = {
    loading: false
}

export const SUGGESTED_BEERS_SUCCESS = 'SUGGESTED_BEERS_SUCCESS';
export const SUGGESTED_BEERS_LOADING = 'SUGGESTED_BEERS_LOADING';
export const SUGGESTED_BEERS_FAIL = 'SUGGESTED_BEERS_FAIL';

export interface SuggestedBeerLoading {
    type: typeof SUGGESTED_BEERS_LOADING;
}

export interface SuggestedBeerFail {
    type: typeof SUGGESTED_BEERS_FAIL;
}

export interface SuggestedBeerSucess {
    type: typeof SUGGESTED_BEERS_SUCCESS;
    payload: {
        suggestedBeers: IBeer[];
    };
}

export function GetSingleBeerSuggestedItems(abv: number , ibu: number) {
    return async function (dispatch: Dispatch) {
        dispatch({
            type: SUGGESTED_BEERS_LOADING
        });

        getSingleBeerSuggestedItems(abv, ibu )
            .then(res => {
                dispatch({
                    type: SUGGESTED_BEERS_SUCCESS,
                    payload: res.data
                })
            })
            .catch((e) => {
                dispatch({
                    type: SUGGESTED_BEERS_FAIL
                })
            });
    }
}

export function SuggestedBeersReducer(state: InitialSuggestedBeerState = initialState,
    action: SuggestedBeerFail | SuggestedBeerLoading | SuggestedBeerSucess) {
    switch (action.type) {
        case SUGGESTED_BEERS_FAIL:
            {
                return {
                    loading: false
                }
            }
        case SUGGESTED_BEERS_LOADING: {
            return {
                loading: true
            }
        }
        case SUGGESTED_BEERS_SUCCESS: {
            return {
                loading: false,
                suggestedBeers: action.payload
            }
        }
        default: {
            return state
        }

    }
}

