import React from 'react';
import store from '../../../Redux/Store';
import "./Board.css"

class Board extends React.Component{

constructor(props){
    super(props)
    this.state = {
    isClickable: true,
    isWinner: false ,
    userClick: 0 ,
    userWin: 0,
    computerWin: 0,
    tieGames: 0,
    isPlayed: false
    };

}

componentDidMount(){
store.subscribe( ()=>{
  this.setState({
    isClickable: store.getState().isClickable,
    isWinner: store.getState().isWinner ,
    userClick: store.getState().userClick ,
    userWin: store.getState().userWin,
    computerWin: store.getState().computerWin,
    tieGames: store.getState().tieGames,
    isPlayed: store.getState().isPlayed
  })  
})
}


handelClickAsync = async (index) =>{

if(!this.state.isClickable){
return
}
if(this.refs["block"+index].classList.length > 0){
return
}
if(this.state.isWinner){
return
}
this.refs["block"+index].className = "x";
this.refs["block"+index].classList.add("x")
// await this.setState({
//     isClickable:false,
//     userClick: this.state.userClick + 1,
//     isPlayed: false
//     })
store.dispatch({type: "isClickable",payload:false});
store.dispatch({type: "userClick"});
store.dispatch({type: "isPlayed",payload:true});

console.log(this.state.userClick)

await this.checkWinner();
if(!this.state.isWinner){
this.computerTurn(index)
}
 
}

computerTurn(){
setTimeout( ()=>{

let nextMove = []
const winBlockCombination = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]]

if(!this.state.isPlayed){
    for(let data of winBlockCombination) {
        const val1 = this.refs["block"+data[0]].classList[0];
        const val2 = this.refs["block"+data[1]].classList[0];
        const val3 = this.refs["block"+data[2]].classList[0];
    if(val1 === "o" && val2 === "o" || val1 === "o" && val3 === "o" || val3 === "o" && val2 === "o" ){
        if(val1 === undefined){
            this.refs["block"+data[0]].className = "o";
            this.refs["block"+data[0]].classList.add("o")
            this.checkWinner()
            this.setState({isPlayed:true})
            break
            }
            if(val2 === undefined){
            this.refs["block"+data[1]].className = "o";
            this.refs["block"+data[1]].classList.add("o")  
            this.checkWinner()
            this.setState({isPlayed:true})
            break   
            }
            if(val3 === undefined){
            this.refs["block"+data[2]].className = "o";
            this.refs["block"+data[2]].classList.add("o")  
            this.checkWinner()
            this.setState({isPlayed:true})
            break   
            }}   
        }}

        if(!this.state.isPlayed){
            for(let data of winBlockCombination) {
            const val1 = this.refs["block"+data[0]].classList[0];
            const val2 = this.refs["block"+data[1]].classList[0];
            const val3 = this.refs["block"+data[2]].classList[0];
            
            if( val1 === "x" && val2 === "x" || val1 === "x" && val3 === "x" || val2 === "x" && val3 === "x"){
                if(val1 === undefined){
                this.refs["block"+data[0]].className = "o";
                this.refs["block"+data[0]].classList.add("o")
                this.checkWinner()
                this.setState({isPlayed:true})
                break
                }
                if(val2 === undefined){
                this.refs["block"+data[1]].className = "o";
                this.refs["block"+data[1]].classList.add("o")  
                this.checkWinner()
                this.setState({isPlayed:true})
                break   
                }
                if(val3 === undefined){
                this.refs["block"+data[2]].className = "o";
                this.refs["block"+data[2]].classList.add("o")  
                this.checkWinner()
                this.setState({isPlayed:true})
                break   
                }}
                }}
            
if(!this.state.isPlayed){
for(let i = 1 ; i<9 ; i++){
if(this.refs["block"+i].classList[0] === undefined){
    nextMove.push(i)
}}
if(nextMove === undefined){
    return
}
const nextStep = nextMove[Math.floor(Math.random()*nextMove.length)]
this.refs["block"+nextStep].className = "o";
this.refs["block"+nextStep].classList.add("o")
}
this.setState({
    isClickable:true
})

},1000)
}




checkWinner(){

const winCombination = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

winCombination.forEach( data => {

    const val1 = this.refs["block"+data[0]].classList[0];
    const val2 = this.refs["block"+data[1]].classList[0];
    const val3 = this.refs["block"+data[2]].classList[0];

if(val1 === undefined && val2 === undefined && val3 === undefined){
return 
}  

if( val1 === val2 && val1=== val3 ){
this.refs["block"+data[0]].className === "x" ? 

this.setState({userWin: this.state.userWin +1, isClickable:false}) : 

this.setState({computerWin:this.state.computerWin+1, isClickable:false})  

this.setState({isWinner: true});

this.resetGame();

return}
} )

if(this.state.userClick > 4){

this.setState({tieGames: this.state.tieGames + 1,isClickable:false});

this.setState({isWinner: true});

this.resetGame();

return 
}
}


resetGame(){ 
setTimeout(()=>{
    for(let i = 1 ; i <=9 ; i ++){
        this.refs["block"+[i]].classList = ""
}
this.setState({
    isWinner: false ,
    isClickable:true,
    userClick: 0
})
},1000)
}


render() {
return (
<div className="Game">      
<div className="Board">
    <div className='grid-container'>
        <div onClick={() => this.handelClickAsync(1)} className='grid-item top left'><div ref="block1"></div></div>
        <div onClick={() => this.handelClickAsync(2)} className='grid-item top left'><div ref="block2"></div></div>
        <div onClick={() => this.handelClickAsync(3)} className='grid-item top'><div ref="block3"></div></div>
        <div onClick={() => this.handelClickAsync(4)} className='grid-item top left'><div ref="block4"></div></div>
        <div onClick={() => this.handelClickAsync(5)} className='grid-item top left'><div ref="block5"></div></div>
        <div onClick={() => this.handelClickAsync(6)} className='grid-item top'><div ref="block6"></div></div>
        <div onClick={() => this.handelClickAsync(7)} className='grid-item left'><div ref="block7"></div></div>
        <div onClick={() => this.handelClickAsync(8)} className='grid-item left'><div ref="block8"></div></div>
        <div onClick={() => this.handelClickAsync(9)} className='grid-item'><div ref="block9"></div></div>
    </div>
</div>
<div className='scores'>
               <p className='player1'>
                  <span className='p1'>Player</span>
                  <span className='score'> {this.state.userWin}</span>
               </p>
               <p className='ties'>
                  Tie<span className='score'> {this.state.tieGames}</span>
               </p>
               <p className='player2'>
                  <span className='p1'>Computer</span>
                  <span className='score'>{this.state.computerWin}</span>
               </p>
</div>
</div>
         );
    }

 









}

export default Board;
