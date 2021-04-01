import Board from "../../GameArea/Board/Board";
import Footer from "../Footer/Footer";
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
         <footer>
             <Footer />
         </footer>
      </div>
   );
}

export default Layout;
