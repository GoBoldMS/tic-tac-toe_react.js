import { createStore } from "redux";
import { gameStateReducer } from "./gameState";


const store = createStore(gameStateReducer);

export default store ;