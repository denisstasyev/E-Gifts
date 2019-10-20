import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  filter: {
    position: "fixed",
    bottom: theme.spacing(9),
    left: theme.spacing(2)
  },
  chips: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
    // display: "flex"
    // justifyContent: "center"
  },
  chip: {
    margin: theme.spacing(1)
  }
}));

const Filters = () => {
  const classes = useStyles();

  const allowedState = [
    { id: 1, label: "Christmas" },
    { id: 2, label: "New Year" },
    { id: 3, label: "Birthday" },
    { id: 4, label: "Anniversary" },
    { id: 5, label: "Kids" },
    { id: 6, label: "Women" },
    { id: 7, label: "Men" }
  ];

  // const [values, setValues] = React.useState({
  //   username: "",
  //   password: "",
  //   rememberMe: true,
  //   showPassword: false
  // });

  const handleDelete = () => {
    alert("You clicked the delete icon.");
  };

  return (
    <React.Fragment>
      <Container maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SearchIcon />
          </Avatar>
          <Typography variant="h5">Filters</Typography>
          <div className={classes.chips}>
            {allowedState.map((element, index) => (
              <Chip
                className={classes.chip}
                key={index}
                size="medium"
                label={element.label}
                color="default" //"primary"
                //{   ?  : onDelete={handleDelete}}
              />
            ))}
          </div>
        </div>
      </Container>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        className={classes.filter}
        component={Link}
        to="/gallery"
      >
        Close
      </Fab>
      <Toolbar />
    </React.Fragment>
  );
};

export default Filters;
