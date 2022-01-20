import axios from "axios";
import { IBeer } from "../common/types/BeersTypes";
export const baseURL = "https://api.punkapi.com/v2/";

export function getBeersBy(perPage: number, brewedAfter: string, brewedBefore: string, byName: string) {
    const byNameParam = byName ? `&beer_name=${byName}` : '';
    return axios
        .get<IBeer[]>(`${baseURL}beers?page=1&per_page=${perPage}&brewed_after=${brewedAfter}&brewed_before=${brewedBefore}${byNameParam}`);
}

export function getSingleBeer(id: string) {
    return axios
        .get<IBeer[]>(`${baseURL}beers/${id}`);
}

export function getSingleBeerSuggestedItems(abv: number, ibu: number) {
    const abv_gt = (abv - 1 < 0 ? 0 : abv - 1).toFixed(2);
    const ibu_gt = (ibu - 10 < 0 ? 0 : abv - 1).toFixed(2);
    return axios
        .get<IBeer[]>
        (`${baseURL}beers?page=1&per_page=5&abv_gt=${abv_gt}&abv_lt=${(abv + 1).toFixed(2)}&ibu_gt=${ibu_gt}&ibu_lt=${(ibu + 10).toFixed(2)}`);
}
