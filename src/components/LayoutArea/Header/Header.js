import { Container, Typography } from "@material-ui/core";
import {useEffect, useState } from "react";
import store from "../../../Redux/Store";
import css from "../Header/Header.module.css";

 
function Header(){

const [headingText,setHeadingText] = useState("TIC Tac Toe")

function heading(isWinner,gameWinner) {

    if(isWinner){
        if(gameWinner === "PlayerWin"){
            return setHeadingText("You Are The Winner!") ;
        }
        else if(gameWinner === "ComputerWin"){

            return setHeadingText("You Lose :(")
        }
        else{
            return setHeadingText("Tie Game");
        }
    }
    setHeadingText("TIC Tac Toe")
}

useEffect( () => {
store.subscribe( ()=>{
    const isWinner = store.getState().isWinner
    const gameWinner = store.getState().gameWinner
    heading(isWinner,gameWinner)    
 });
},[]);


   return (
      <Container maxWidth='xl'>
         <Typography variant='h1' className={css.header + " " + css.color}>
            {headingText}
         </Typography>
      </Container>
   );
}

export default Header;
