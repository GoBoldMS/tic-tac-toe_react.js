import React, { createRef } from "react";
import store from "../../../Redux/Store";
import "./Board.css";

class Board extends React.Component {
   constructor(props) {
      super(props);
      this.ref = [createRef(),createRef(),createRef(),createRef(),createRef(),createRef(),createRef(),createRef(),createRef()];
      this.state = {
         isClickable: store.getState().isClickable,
         isWinner: store.getState().isWinner,
         userClick: store.getState().userClick,
         userWin: store.getState().userWin,
         computerWin: store.getState().computerWin,
         tieGames: store.getState().tieGames,
         isPlayed: store.getState().isPlayed,
      };
   }

   componentDidMount() {
      store.subscribe(() => {
         this.setState({
            isClickable: store.getState().isClickable,
            isWinner: store.getState().isWinner,
            userClick: store.getState().userClick,
            userWin: store.getState().userWin,
            computerWin: store.getState().computerWin,
            tieGames: store.getState().tieGames,
            isPlayed: store.getState().isPlayed,
         });
      });
   }

   componentWillUnmount() {
      store.subscribe(() => {
         this.setState({
            isClickable: store.getState().isClickable,
            isWinner: store.getState().isWinner,
            userClick: store.getState().userClick,
            userWin: store.getState().userWin,
            computerWin: store.getState().computerWin,
            tieGames: store.getState().tieGames,
            isPlayed: store.getState().isPlayed,
         });
      });
   }

   handelClickAsync = async (index) => {
       
      try {
         if (!this.state.isClickable) {
            return;
         }
         if (this.ref[index].current.classList.length > 0) {
            return;
         }
         if (this.state.isWinner) {
            return;
         }
         this.ref[index].current.className = "x";
         this.ref[index].current.classList.add("x");

         store.dispatch({ type: "isClickable", payload: false });
         await store.dispatch({ type: "userClick" });
         store.dispatch({ type: "isPlayed", payload: false });

         this.checkWinner();
         if (!this.state.isWinner) {
            this.computerTurn();
         }
      } catch (err) {
         alert(err);
      }
   };

   computerTurn() {
       
      setTimeout(() => {
         let nextMove = [];
         const winBlockCombination = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
         ];

         if (!this.state.isPlayed) {
            for (let data of winBlockCombination) {
               const val1 = this.ref[data[0]].current.classList[0];
               const val2 = this.ref[data[1]].current.classList[0];
               const val3 = this.ref[data[2]].current.classList[0];

               // eslint-disable-next-line no-mixed-operators
               if (
                  (val1 === "o" && val2 === "o") ||
                  (val1 === "o" && val3 === "o") ||
                  (val3 === "o" && val2 === "o")
               ) {
                  if (val1 === undefined) {
                     this.ref[data[0]].current.className = "o";
                     this.ref[data[0]].current.classList.add("o");
                     this.checkWinner();
                     store.dispatch({ type: "isPlayed", payload: true });
                     break;
                  }
                  if (val2 === undefined) {
                     this.ref[data[1]].current.className = "o";
                     this.ref[data[1]].current.classList.add("o");
                     this.checkWinner();
                     store.dispatch({ type: "isPlayed", payload: true });
                     break;
                  }
                  if (val3 === undefined) {
                     this.ref[data[2]].current.className = "o";
                     this.ref[data[2]].current.classList.add("o");
                     this.checkWinner();
                     store.dispatch({ type: "isPlayed", payload: true });
                     break;
                  }
               }
            }
         }

         if (!this.state.isPlayed) {
            for (let data of winBlockCombination) {
               const val1 = this.ref[data[0]].current.classList[0];
               const val2 = this.ref[data[1]].current.classList[0];
               const val3 = this.ref[data[2]].current.classList[0];

               // eslint-disable-next-line no-mixed-operators
               if (
                  (val1 === "x" && val2 === "x") ||
                  (val1 === "x" && val3 === "x") ||
                  (val2 === "x" && val3 === "x")
               ) {
                  if (val1 === undefined) {
                     this.ref[data[0]].current.className = "o";
                     this.ref[data[0]].current.classList.add("o");
                     this.checkWinner();
                     store.dispatch({ type: "isPlayed", payload: true });
                     break;
                  }
                  if (val2 === undefined) {
                     this.ref[data[1]].current.className = "o";
                     this.ref[data[1]].current.classList.add("o");
                     this.checkWinner();
                     store.dispatch({ type: "isPlayed", payload: true });
                     break;
                  }
                  if (val3 === undefined) {
                     this.ref[data[2]].current.className = "o";
                     this.ref[data[2]].current.classList.add("o");
                     this.checkWinner();
                     store.dispatch({ type: "isPlayed", payload: true });
                     break;
                  }
               }
            }
         }

         if (!this.state.isPlayed) {
            for (let i = 1; i < 9; i++) {
               if (this.ref[i].current.classList[0] === undefined) {
                  nextMove.push(i);
               }
            }
            if (nextMove === undefined) {
               return;
            }
            const nextStep =
               nextMove[Math.floor(Math.random() * nextMove.length)];
            this.ref[nextStep].current.className = "o";
            this.ref[nextStep].current.classList.add("o");
         }
         store.dispatch({ type: "isClickable", payload: true });
      }, 500);
   }

   checkWinner() {
      
      const winCombination = [
         [0, 1, 2],
         [3, 4, 5],
         [6, 7, 8],
         [0, 3, 6],
         [1, 4, 7],
         [2, 5, 8],
         [0, 4, 8],
         [2, 4, 6]
      ];

      winCombination.forEach((data) => {
          
         const val1 = this.ref[data[0]].current.classList[0];
         const val2 = this.ref[data[1]].current.classList[0];
         const val3 = this.ref[data[2]].current.classList[0];

         if (val1 === undefined && val2 === undefined && val3 === undefined) {
            return;
         }

         if (val1 === val2 && val1 === val3) {
            this.ref[data[0]].current.className === "x" ? 
            store.dispatch({ type: "userWin" }) : 
            store.dispatch({ type: "computerWin" }) ;
    
            store.dispatch({ type: "isClickable", payload: false }) 
            store.dispatch({ type: "isWinner", payload: true }) 
            store.dispatch({ type: "isPlayed", payload: true })

            this.resetGame();
            return;
         }
      });
      if (this.state.userClick > 4) {
         store.dispatch({ type: "tieGames" });
         store.dispatch({ type: "isClickable", payload: false });
         store.dispatch({ type: "isWinner", payload: true });
         store.dispatch({ type: "isPlayed", payload: true });
         this.resetGame();
         return;
      }
   }

   resetGame() {
      setTimeout(() => {
         for (let i = 0; i <= 8; i++) {
            this.ref[i].current.classList = "";
         }
         store.dispatch({ type: "isWinner", payload: false });
         store.dispatch({ type: "isClickable", payload: true });
         store.dispatch({ type: "userClickReset" });
      }, 1000);
   }

   render() {
      return (
         <div className='Game'>
            <div className='Board'>
               <div className='grid-container'>
                  <div
                     onClick={() => this.handelClickAsync(0)}
                     className='grid-item top left'>
                     <div ref={this.ref[0]}></div>
                  </div>
                  <div
                     onClick={() => this.handelClickAsync(1)}
                     className='grid-item top left'>
                     <div ref={this.ref[1]}></div>
                  </div>
                  <div
                     onClick={() => this.handelClickAsync(2)}
                     className='grid-item top'>
                     <div ref={this.ref[2]}></div>
                  </div>
                  <div
                     onClick={() => this.handelClickAsync(3)}
                     className='grid-item top left'>
                     <div ref={this.ref[3]}></div>
                  </div>
                  <div
                     onClick={() => this.handelClickAsync(4)}
                     className='grid-item top left'>
                     <div ref={this.ref[4]}></div>
                  </div>
                  <div
                     onClick={() => this.handelClickAsync(5)}
                     className='grid-item top'>
                     <div ref={this.ref[5]}></div>
                  </div>
                  <div
                     onClick={() => this.handelClickAsync(6)}
                     className='grid-item left'>
                     <div ref={this.ref[6]}></div>
                  </div>
                  <div
                     onClick={() => this.handelClickAsync(7)}
                     className='grid-item left'>
                     <div ref={this.ref[7]}></div>
                  </div>
                  <div
                     onClick={() => this.handelClickAsync(8)}
                     className='grid-item'>
                     <div ref={this.ref[8]}></div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default Board;
