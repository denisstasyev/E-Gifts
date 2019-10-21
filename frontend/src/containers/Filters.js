import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import Chip from "@material-ui/core/Chip";

import { Redirect } from "react-router-dom";

import { FILTERS_SET_SELECTED_TAGS } from "store/actionTypes";

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
  alert: {
    color: "red",
    marginTop: theme.spacing(1)
  },
  info: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  filter: {
    position: "fixed",
    bottom: theme.spacing(9),
    left: theme.spacing(2)
  },
  chips: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  chip: {
    margin: theme.spacing(1)
  }
}));

const Filters = props => {
  const classes = useStyles();

  return !props.galleryWasVisited ? (
    <Redirect to="/gallery" />
  ) : (
    <React.Fragment>
      <Container maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SearchIcon />
          </Avatar>
          <Typography variant="h5">Filters</Typography>
          <div className={classes.chips}>
            {props.availableTags.length === 0 ? (
              <Typography className={classes.alert} align="center">
                Network problem, try again later
              </Typography>
            ) : (
              <React.Fragment>
                <Typography className={classes.info} align="center">
                  Select appropriate tags
                </Typography>
                {props.availableTags.map((tag, index) => (
                  <Chip
                    className={classes.chip}
                    key={index}
                    size="medium"
                    label={tag}
                    color={
                      props.selectedTags.indexOf(tag) === -1 //TODO: fix double check
                        ? "default"
                        : "primary"
                    }
                    onClick={() => {
                      props.handleSelectTag(tag);
                    }}
                  />
                ))}
              </React.Fragment>
            )}
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

const mapStateToProps = state => ({
  availableTags: state.filtersReducer.availableTags,
  selectedTags: state.filtersReducer.selectedTags,
  galleryWasVisited: state.galleryReducer.wasVisited
});

const mapDispatchToProps = dispatch => ({
  handleSelectTag: tag =>
    dispatch({
      type: FILTERS_SET_SELECTED_TAGS,
      tag
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
