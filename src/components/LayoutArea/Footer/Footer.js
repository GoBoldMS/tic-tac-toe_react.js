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
    })
})
    return (
        <div className="Footer">
			<div className='scores'>
               <p className='player1'>
                  <span className='p1'>Player</span>
                  <span className='score'> {playerWin}</span>
               </p>
               <p className='ties'>
                  Tie<span className='score'>{tieGames}</span>
               </p>
               <p className='player2'>
                  <span className='p1'>Computer</span>
                  <span className='score'>{computerWin}</span>
               </p>
</div>
        </div>
    );
}

export default Footer;
