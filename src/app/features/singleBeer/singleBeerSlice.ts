import { IBeer } from "../../../common/types/BeersTypes";
import { Dispatch } from 'redux';
import { getSingleBeer } from "../../../services/beersService";


export interface InitialSingleBeerState {
    loading: boolean;
    singleBeer?: IBeer
}

const initialState: InitialSingleBeerState = {
    loading: false
}

export const SINGLE_BEER_SUCCESS = 'SINGLE_BEER_SUCCESS';
export const SINGLE_BEER_LOADING = 'SINGLE_BEER_LOADING';
export const SINGLE_BEER_FAIL = 'SINGLE_BEER_FAIL';

export interface SingleBeerLoading {
    type: typeof SINGLE_BEER_LOADING;
}

export interface SingleBeerFail {
    type: typeof SINGLE_BEER_FAIL;
}

export interface SingleBeerSuccess {
    type: typeof SINGLE_BEER_SUCCESS;
    payload: {
        singleBeer: IBeer;
    };
}


export function GetSingleBeer(id: string) {
    return async function (dispatch: Dispatch) {
        dispatch({
            type: SINGLE_BEER_LOADING
        });

        getSingleBeer(id)
            .then(res => {
                dispatch({
                    type: SINGLE_BEER_SUCCESS,
                    payload: res.data.at(0)
                })
            })
            .catch((e) => {
                dispatch({
                    type: SINGLE_BEER_FAIL
                })
            });
    }
}

export function SingleBeerReducer(state: InitialSingleBeerState = initialState,
    action: SingleBeerFail | SingleBeerLoading | SingleBeerSuccess ) {
    switch (action.type) {
        case SINGLE_BEER_FAIL:
            {
                return {
                    loading: false
                }
            }
        case SINGLE_BEER_LOADING: {
            return {
                loading: true
            }
        }
        case SINGLE_BEER_SUCCESS: {
            return {
                loading: false,
                singleBeer: action.payload
            }
        }
        default: {
            return state
        }

    }
}