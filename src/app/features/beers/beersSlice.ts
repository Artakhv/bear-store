import { IBeer } from "../../../common/types/BeersTypes";
import { Dispatch } from 'redux';
import { getBeersBy } from "../../../services/beersService";

export interface InitialBeerState {
    loading: boolean;
    beers?: IBeer[];
    errorMessage?: string
}

const initialState: InitialBeerState = {
    loading: false
}

export const BEERS_SUCCESS = 'BEERS_SUCCESS';
export const BEERS_LOADING = 'BEERS_LOADING';
export const BEERS_FAIL = 'BEERS_FAIL';

export interface BeerLoading {
    type: typeof BEERS_LOADING;
    payload: {
        beers: IBeer
    }
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

export function GetBeersBy(perPage: number, brewedAfter: string, brewedBefore: string, byName: string) { /// todo
    return async function (dispatch: Dispatch, getState: Function) {
        dispatch({
            type: BEERS_LOADING,
            payload: {
                beers: getState().beers?.beers
            }
        });

        getBeersBy(perPage, brewedAfter, brewedBefore, byName)
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
            const isLoadingLazy = action.payload?.beers ? false : true
            return {
                loading: isLoadingLazy,
                beers: action.payload?.beers,
            }
        }
        case BEERS_SUCCESS: {
            return {
                loading: false,
                beers: action.payload,
                lazyLoading: false
            }
        }
        default: {
            return state
        }

    }
}

