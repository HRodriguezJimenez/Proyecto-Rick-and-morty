import { ADD_FAV, FILTER, REMOVE_FAV, ORDER, RANDOM  } from "./actionsType";


const initialState = {
    myFavorites: [],
    allCharacters: [],
    randomCharacter: null,
};

const rootReducer = (state = initialState, action) => {    
    switch (action.type) {
        case ADD_FAV:
            let copia = state.allCharacters;
            copia.push(action.payload)
            return {
                ...state,
                myFavorites: copia,
                allCharacters: copia,
            }
            
        case REMOVE_FAV:
            let copy2 = state.myFavorites.filter((char) => {
                return char.id !== Number(action.payload);
              });
              return {
                ...state,
                myFavorites: copy2,
              };

        case RANDOM: 
            return { ...state, randomCharacter: action.payload }
        
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