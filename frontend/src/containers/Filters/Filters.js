import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";

import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

import { MyContainer } from "components/MyContainer";
import { MyBox2 } from "components/MyBox2";
import { MyAvatar } from "components/MyAvatar";
import { ButtonFixed } from "components/ButtonFixed";

import { FILTERS_SET_SELECTED_TAGS } from "store/actionTypes";

import { useStyles } from "./styles";

const Filters = props => {
  const classes = useStyles();

  return !props.galleryWasVisited ? (
    <Redirect to="/gallery" />
  ) : (
    <>
      <MyContainer type="small">
        <MyBox2>
          <MyAvatar title="Filters">
            <SearchIcon />
          </MyAvatar>
          {props.availableTags.length === 0 ? (
            <Typography className={classes.alert}>
              Sorry, there are no available tags now
            </Typography>
          ) : (
            <div className={classes.chips}>
              <Typography className={classes.info} align="center">
                Click to select appropriate tags
              </Typography>
              <div className={classes.tags}>
                {props.availableTags.map((tag, index) => (
                  <Chip
                    className={classes.chip}
                    key={index}
                    size="medium"
                    label={tag}
                    color={
                      props.selectedTags.indexOf(tag) === -1
                        ? "default"
                        : "primary"
                    }
                    onClick={() => {
                      props.handleSelectTag(tag);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </MyBox2>
      </MyContainer>
      <ButtonFixed type="link" text="Close" to="/gallery">
        <CloseIcon />
      </ButtonFixed>
    </>
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
