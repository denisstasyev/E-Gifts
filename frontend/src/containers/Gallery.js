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
import Typography from "@material-ui/core/Typography";

import Fab from "@material-ui/core/Fab";
import SearchIcon from "@material-ui/icons/Search";

import * as galleryActionCreators from "store/actions/gallery";
import * as filtersActionCreators from "store/actions/filters";

import { GALLERY_VISIT, GIFT_SET } from "store/actionTypes";

const templateGiftImage = require("static/gifts/template.jpg");

const useStyles = makeStyles(theme => ({
  error: {
    margin: theme.spacing(2, 0, 2)
  },
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
  // gift: {
  //   background:
  //     "linear-gradient(to top, rgba(0,0,0,0.6) 0%,  rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.35) 75%, rgba(0,0,0,0) 100%)"
  // }
}));

const Gallery = props => {
  const classes = useStyles();

  React.useEffect(() => {
    props.getAvailableGifts(props.selectedTags);
    props.getAvailableTags();
    if (!props.galleryWasVisited) {
      props.setVisited();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Header topic="Gallery" />
        <Box my={2}>
          {props.availableGifts.length === 0 ? (
            <Typography className={classes.error} align="center">
              No gifts found, try to change Filters
            </Typography>
          ) : (
            <div className={classes.root}>
              <GridList cellHeight={200} cols={3}>
                <GridListTile
                  key="Subheader"
                  cols={3}
                  style={{ height: "auto" }}
                >
                  <ListSubheader component="div">
                    Filtered gifts list
                  </ListSubheader>
                </GridListTile>
                {props.availableGifts.map((gift, index) => (
                  <GridListTile
                    key={index}
                    cols={index % 10 === 0 || index % 10 === 6 ? 2 : 1}
                    component={Link}
                    to={`/gallery/gift/${gift.id}`}
                    onClick={() => {
                      props.handleSetGift(gift);
                    }}
                  >
                    <img src={templateGiftImage} alt="Template gift" />
                    {/* <img src={gift.urls[0]} alt={gift.name} /> //TODO */}
                    <GridListTileBar
                      // className={classes.gift}
                      title={
                        gift.price === 0
                          ? `${gift.name} - FREE`
                          : `${gift.name} - ${gift.price} $`
                      }
                      subtitle={
                        <React.Fragment>
                          {gift.tags.map((tag, index) => (
                            <Chip
                              key={index}
                              className={classes.chip}
                              size="small"
                              label={tag}
                            />
                          ))}
                        </React.Fragment>
                      }
                    />
                  </GridListTile>
                ))}
              </GridList>
            </div>
          )}
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

const mapStateToProps = state => ({
  selectedTags: state.filtersReducer.selectedTags,
  galleryWasVisited: state.galleryReducer.wasVisited,
  availableGifts: state.galleryReducer.availableGifts
});

const mapDispatchToProps = dispatch => ({
  getAvailableGifts: selectedTags =>
    dispatch(galleryActionCreators.getAvailableGifts(selectedTags)),
  getAvailableTags: () => dispatch(filtersActionCreators.getAvailableTags()),
  setVisited: () => dispatch({ type: GALLERY_VISIT }),
  handleSetGift: gift => dispatch({ type: GIFT_SET, gift })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gallery);
