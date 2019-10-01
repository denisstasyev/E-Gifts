import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";

// import { makeStyles } from "@material-ui/core/styles";
// import useScrollTrigger from "@material-ui/core/useScrollTrigger";
// import Zoom from "@material-ui/core/Zoom";
// import Fab from "@material-ui/core/Fab";
// import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

// const useStyles = makeStyles(theme => ({
//   root: {
//     position: "fixed",
//     bottom: theme.spacing(9),
//     right: theme.spacing(2)
//   }
// }));

// function ScrollTop(props) {
//   const { children, window } = props;
//   const classes = useStyles();
//   // Note that you normally won't need to set the window ref as useScrollTrigger
//   // will default to window.
//   // This is only being set here because the demo is in an iframe.
//   const trigger = useScrollTrigger({
//     target: window ? window() : undefined,
//     disableHysteresis: true,
//     threshold: 100
//   });

//   const handleClick = event => {
//     const anchor = (event.target.ownerDocument || document).querySelector(
//       "#back-to-top-anchor"
//     );

//     if (anchor) {
//       anchor.scrollIntoView({ behavior: "smooth", block: "center" });
//     }
//   };

//   return (
//     <Zoom in={trigger}>
//       <div onClick={handleClick} role="presentation" className={classes.root}>
//         {children}
//       </div>
//     </Zoom>
//   );
// }

export default function Account(props) {
  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      {/* <Image src={require("static/logos/transparent.svg")} /> */}
      <Container>
        <Box my={2}>
          <Toolbar id="back-to-top-anchor">
            <img
              src={require("static/logos/transparent.svg")}
              alt="E-Gifts logo"
              width="40px"
            />
            <Typography variant="h5">Account</Typography>
          </Toolbar>
        </Box>
        <Box my={2}>
          {[...new Array(120)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join("\n")}
        </Box>
      </Container>
      {/* <ScrollTop {...props}>
        <Fab color="secondary" size="medium" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop> */}
      <Toolbar />
    </React.Fragment>
  );
}
