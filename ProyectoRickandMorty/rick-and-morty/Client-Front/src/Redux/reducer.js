import { ADD_FAV, FILTER, REMOVE_FAV, ORDER  } from "./actionsType";


const initialState = {
    myFavorites: [],
    allCharacters: [],
};

const rootReducer = (state = initialState, action) => {    
    switch (action.type) {
        case ADD_FAV:
            return { ...state, myFavorites: action.payload, allCharacters: action.payload };
            
        case REMOVE_FAV:
            return { ...state, myFavorites: action.payload };

        case FILTER:
            const filteredCharacters = state.allCharacters.filter((char) => 
                char.gender === action.payload
            );        
        
            return {
                ...state,
                myFavorites: filteredCharacters, // Actualiza myFavorites con los personajes filtrados
            };

        case ORDER:
            const copyState3 = [ ...state.allCharacters];            
                switch (action.payload) {
                    case "A":
                        copyState3.sort((a, b) => a.id - b.id );                      
                        break;
                    case "D":
                        copyState3.sort((a, b) => b.id - a.id );  
                        break;
                    default:
                        break;
                }            
            
            return { ...state,
                myFavorites: copyState3,
            };            
    
        default:
            return { ...state };
    }
};

export default rootReducer;