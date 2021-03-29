import Board from "../../GameArea/Board/Board";
import Header from "../Header/Header";
 
 
import "./layout.css";

function Layout() {
   return (
      <div className='layout'>
         <header>
            <Header />
         </header>
         <main>
            <Board />
         </main>
      </div>
   );
}

export default Layout;
