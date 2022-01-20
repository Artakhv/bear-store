import axios from "axios";
import { perPageDefaultValue } from "../common/constants/constants";
import { IBeer } from "../common/types/BeersTypes";
export const baseURL = "https://api.punkapi.com/v2/";

export function getBeers(perPage: number = perPageDefaultValue) {
    return axios.get<IBeer[]>(`${baseURL}beers?page=1&per_page=${perPage}`);
}

// https://api.punkapi.com/v2/beers?page=1&per_page=80&brewed_after=1-2000&brewed_before=1-2022
export function getBeersBy(perPage: number, brewedAfter: string, brewedBefore: string, byName: string) {
    const byNameParam = byName ? `&beer_name=${byName}` : '';
    return axios
        .get<IBeer[]>(`${baseURL}beers?page=1&per_page=${perPage}&brewed_after=${brewedAfter}&brewed_before=${brewedBefore}${byNameParam}`);
}

export function getBeersByName(byName: string) {
    return axios.get<IBeer[]>(`${baseURL}beers?beer_name=${byName}`);
}

export function getSingleBeer(id: string) {
    return axios.get<IBeer[]>(`${baseURL}beers/${id}`);
}

export function getSingleBeerSuggestedItems(abv: number = 0, ibu: number) {
    return axios
        .get<IBeer[]>
        (`${baseURL}beers?page=1&per_page=5&abv_gt=${(abv - 1).toFixed(2)}&abv_lt=${(abv + 1).toFixed(2)}&ibu_gt=${(ibu - 10).toFixed(2)}&ibu_lt=${(ibu + 10).toFixed(2)}`);
}
