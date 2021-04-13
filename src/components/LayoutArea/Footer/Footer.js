import { Typography } from "@material-ui/core";
import { useEffect, useState} from "react";
import store from "../../../Redux/Store";
import "./Footer.css";

function Footer(){
 
const [playerWin,setPlayerWin] = useState(0)
const [computerWin,setComputerWin] = useState(0)
const [tieGames,setTieGames] = useState(0)

useEffect( () =>{
store.subscribe( () =>{
        setPlayerWin(store.getState().userWin);
        setComputerWin(store.getState().computerWin);
        setTieGames(store.getState().tieGames);
    });
})

return (
<div className="Footer">
    <div className='scores'>
    <div className='scoreBox'>
    <Typography>Player (X)</Typography>
    <Typography>{playerWin}</Typography>
    </div>
    <div className='scoreBox'>
    <Typography>Tie</Typography>
    <Typography>{tieGames}</Typography>
    </div>
    <div className='scoreBox'>
    <Typography>Computer (O)</Typography>
    <Typography>{computerWin}</Typography>
    </div>
    </div>
</div>
);
}

export default Footer;
