import { Container, Typography } from "@material-ui/core";
import css from "../Header/Header.module.css";

function Header(){


   return (
      <Container maxWidth='xl'>
         <Typography variant='h1' className={css.header + " " + css.color}>
            TIC Tac Toe
         </Typography>
      </Container>
   );
}

export default Header;
