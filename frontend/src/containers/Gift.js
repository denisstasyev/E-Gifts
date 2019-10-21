import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Header from "components/Header";

import image from "static/gifts/template.jpg";

const useStyles = makeStyles(theme => ({
  back: {
    position: "fixed",
    bottom: theme.spacing(9),
    left: theme.spacing(2)
  },
  backIcon: {
    marginRight: theme.spacing(1)
  },
  buy: {
    margin: theme.spacing(2, 0, 2)
  }
}));

const Gift = props => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Header topic="Gift" />
        <Box my={2} className={classes.box} width="100%">
          <img
            src={image}
            alt="Template gift"
            style={{
              width: "inherit",
              height: "inherit",
              maxWidth: "50vh",
              maxHeight: "50vh",
              align: "center"
            }}
          />
          <Chip
            className={classes.chip}
            // key=1
            size="medium"
            label="Birthday"
            color="default" //"primary"
            //{   ?  : onDelete={handleDelete}}
          />
          <Typography align="center">
            Very very very good gift for anyone!
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.buy}
            // onClick={handleSubmit}
          >
            Buy
          </Button>
        </Box>
      </Container>
      {/* <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        className={classes.back}
        component={Link}
        to="/gallery"
      >
        Back
      </Fab> */}
      <Toolbar />
    </React.Fragment>
  );
};

export default Gift;
