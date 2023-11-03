import { ADD_FAV, REMOVE_FAV, ORDER, FILTER, RANDOM } from "./actionsType";
import axios from "axios";

export const addFav = (character) => {
    const endpoint = 'http://localhost:3001/rickandmorty/fav';
    return async (dispatch) => {
        try {
            const { data } = await axios.post(endpoint, character);
            return dispatch({
                type: ADD_FAV,
                payload: data,
            });
        } catch (error) {
            Error(error);
        }
    };
};

export const removeFav = (id) => {
    const endpoint = `http://localhost:3001/rickandmorty/fav/${id}`;
    return async (dispatch) => {
        try {
            const { data } = await axios.delete(endpoint)
            return dispatch({
                type: REMOVE_FAV,
                payload: data,
            });
        } catch (err) {
            Error(err)
        };
    };
}; 

export const filterCards = (gender) => {
    return {
        type: FILTER,
        payload: gender,
    }
};

export const orderCards = (order) => {
    return {
        type: ORDER,
        payload: order,
    }
};

export const randomCard = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3001/rickandmorty/randomCharacter")
            dispatch({
                type: RANDOM,
                payload: response.data,
            })
        } catch (error) {
            throw Error({error: error.message})    
        }
    }
}
