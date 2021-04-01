export class GlobalState {

constructor(
public isClickable: boolean = true,
public isWinner: boolean = false,
public userClick: number = 1,
public userWin: number = 0 ,
public computerWin: number = 0,
public tieGames: number = 0,
public isPlayed: boolean = false,
    ){}
}

export default GlobalState;

export class GameState {
public gameState: GlobalState[] = [] 
}

export enum GameActionType {
    isClickable = "isClickable",
    isWinner = "isWinner" ,
    userClick = "userClick" ,
    userClickReset = "userClickReset",
    userWin = "userWin",
    computerWin = "computerWin",
    tieGames = "tieGames",
    isPlayed = "isPlayed"
}

export interface GameAction {
    type: GameActionType,
    payload?: any
} 

export function isClickable(gameStateIsClickable:GlobalState):GameAction {

    return { type:GameActionType.isClickable,payload:gameStateIsClickable}
}
export function isWinner(gameStateWinner:GlobalState):GameAction {
    return { type:GameActionType.isWinner,payload:gameStateWinner}
}
export function userClick(userClick:number):GameAction {
    return { type:GameActionType.userClick,payload:userClick}
}
export function userClickReset(userClickReset:number):GameAction {
    return {type:GameActionType.userClickReset,payload:userClickReset}
}
export function userWin(userWin:number):GameAction {
    return { type:GameActionType.userWin,payload:userWin}
}
export function computerWin(computerWin:number):GameAction {
    return { type:GameActionType.computerWin,payload:computerWin}
}
export function tieGames(tieGames:number):GameAction {
    return { type:GameActionType.tieGames,payload:tieGames}
}
export function isPlayed(gameStateIsPlayed:GlobalState):GameAction {
    return { type:GameActionType.isPlayed,payload:gameStateIsPlayed}
}


export function gameStateReducer(currentState = new GlobalState(),action: GameAction):GlobalState {
    const newState = {...currentState}
    switch(action.type){
        case GameActionType.isClickable:
        newState.isClickable = action.payload
        break;
        case GameActionType.isPlayed:
        newState.isPlayed = action.payload
        break;
        case GameActionType.computerWin:
        newState.computerWin += 1
        break;
        case GameActionType.userClick:
        newState.userClick += 1
        break;
        case GameActionType.userClickReset:
        newState.userClick = 0
        break;
        case GameActionType.tieGames:
        newState.tieGames += 1
        break;
        case GameActionType.userWin:
        newState.userWin += 1
        break;
        case GameActionType.isWinner:
        newState.isWinner = action.payload
        break;
    }
    return newState;
}

 