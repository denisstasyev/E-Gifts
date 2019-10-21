import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import Header from "components/Header";
import ScrollTop from "components/ScrollTop";

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import Chip from "@material-ui/core/Chip";
import tileData from "./tileData";

import Fab from "@material-ui/core/Fab";
import SearchIcon from "@material-ui/icons/Search";

import * as filtersActionCreators from "store/actions/filters";

import { GALLERY_VISIT } from "store/actionTypes";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  chip: {
    marginRight: theme.spacing(1)
  },
  filter: {
    position: "fixed",
    bottom: theme.spacing(9),
    left: theme.spacing(2)
  },
  filtersIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Gallery = props => {
  const classes = useStyles();

  props.getAvailableTags();
  props.setVisited();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Header topic="Gallery" />
        <Box my={2}>
          <div className={classes.root}>
            <GridList cellHeight={200} cols={3}>
              <GridListTile key="Subheader" cols={3} style={{ height: "auto" }}>
                <ListSubheader component="div">
                  Filtered gifts list
                </ListSubheader>
              </GridListTile>
              {tileData.map(tile => (
                <GridListTile
                  key={tile.img}
                  cols={tile.cols || 1}
                  component={Link}
                  to="/gallery/product"
                >
                  <img src={tile.img} alt={tile.title} />
                  <GridListTileBar
                    title={tile.title}
                    subtitle={
                      <React.Fragment>
                        <Chip
                          className={classes.chip}
                          size="small"
                          label="Birthday"
                        />
                        <Chip
                          className={classes.chip}
                          size="small"
                          label="Christmas"
                        />
                      </React.Fragment>
                    } //TODO
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </Box>
      </Container>
      <ScrollTop />
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        className={classes.filter}
        component={Link}
        to="/gallery/filters"
      >
        <SearchIcon className={classes.filtersIcon} />
        Filters
      </Fab>
      <Toolbar />
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  setVisited: () => dispatch({ type: GALLERY_VISIT }),
  getAvailableTags: () => dispatch(filtersActionCreators.getAvailableTags())
});

export default connect(
  null,
  mapDispatchToProps
)(Gallery);
