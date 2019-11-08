import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Chip from "@material-ui/core/Chip";
import Fab from "@material-ui/core/Fab";

import SearchIcon from "@material-ui/icons/Search";

import { MyContainer } from "components/MyContainer";
import { Header } from "components/Header";
import { MyBox } from "components/MyBox";

import * as galleryActionCreators from "store/actions/gallery";
import * as filtersActionCreators from "store/actions/filters";

import { GALLERY_VISIT, GIFT_SET } from "store/actionTypes";

import * as config from "configs/backendAPI";

import { MOBILE_WIDTH } from "configs/CSSvariables";

import { priceToString } from "utils";

import { useStyles } from "./styles";

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
    <>
      <MyContainer>
        <Header topic="Gallery" />
        <Box id="content" mb={9}>
          <MyBox title="Filtered E-Gifts">
            {props.availableGifts.length === 0 ? (
              <Typography>No gifts found, try to change Filters</Typography>
            ) : window.innerWidth > MOBILE_WIDTH ? (
              <GridList className={classes.root} cellHeight={300} cols={3}>
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
                    <img
                      src={`${config.BACKEND_SERVER}/${gift.urls[0]}`}
                      alt={gift.name}
                    />
                    <GridListTileBar
                      title={`${gift.name} - ${priceToString(gift.price)}`}
                      subtitle={gift.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          className={classes.chip}
                          size="small"
                          label={tag}
                        />
                      ))}
                    />
                  </GridListTile>
                ))}
              </GridList>
            ) : (
              <GridList className={classes.root} cellHeight={200} cols={2}>
                {props.availableGifts.map((gift, index) => (
                  <GridListTile
                    key={index}
                    cols={index % 5 === 0 ? 2 : 1}
                    component={Link}
                    to={`/gallery/gift/${gift.id}`}
                    onClick={() => {
                      props.handleSetGift(gift);
                    }}
                  >
                    <img
                      src={`${config.BACKEND_SERVER}/${gift.urls[0]}`}
                      alt={gift.name}
                    />
                    <GridListTileBar
                      title={
                        gift.price === 0
                          ? `${gift.name} - FREE`
                          : `${gift.name} - ${gift.price} $`
                      }
                      subtitle={gift.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          className={classes.chip}
                          size="small"
                          label={tag}
                        />
                      ))}
                    />
                  </GridListTile>
                ))}
              </GridList>
            )}
          </MyBox>
        </Box>
      </MyContainer>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        className={classes.fixedButton}
        component={Link}
        to="/gallery/filters"
      >
        <SearchIcon className={classes.icon} />
        Filters
      </Fab>
    </>
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
