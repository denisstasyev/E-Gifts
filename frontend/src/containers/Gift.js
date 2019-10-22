import React from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
// import Fab from "@material-ui/core/Fab";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import Grid from "@material-ui/core/Grid";

import Header from "components/Header";

import * as giftActionCreators from "store/actions/gift";

import * as config from "config";

import { Carousel, CarouselSlide } from "material-ui-carousel";

const useStyles = makeStyles(theme => ({
  info: {
    display: "flex",
    flexWrap: "wrap"
    // flexDirection: "column"
    // justifyContent: "space-evently"
  },
  // backIcon: {
  //   marginRight: theme.spacing(1)
  // },
  buy: {
    margin: theme.spacing(2, 0, 2)
  }
}));

const Gift = props => {
  const classes = useStyles();

  // if (props.match.params.id !== props.id || props.id === null) {
  // props.getGift(props.match.params.id);
  // }

  console.log(props.tags);
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Header topic={`Gift #${props.id}`} />
        <Box my={2} className={classes.box} width="100%">
          <div className={classes.info}>
            <Carousel>
              <CarouselSlide>
                <img
                  src={`${config.BACKEND_SERVER}/${props.urls[0]}`}
                  alt={props.name}
                  style={{
                    width: "inherit",
                    height: "inherit",
                    maxWidth: "50vh",
                    maxHeight: "50vh",
                    align: "center"
                  }}
                />
              </CarouselSlide>
            </Carousel>
            <React.Fragment>
              <Typography align="center">{props.name}</Typography>
              {/* <Chip //TODO: fix this
                className={classes.chip}
                key="1"
                size="medium"
                label="{tag}"
                color="default"
              /> */}
              {props.tags.forEach((tag, index) => (
                <Chip
                  className={classes.chip}
                  key={index}
                  size="medium"
                  label={tag}
                  color="default"
                />
              ))}
              <Typography align="center">{props.description}</Typography>
              <Typography align="center">
                {props.price === 0 ? `FREE` : `${props.price} $`}
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
            </React.Fragment>
          </div>
        </Box>
      </Container>
      <Toolbar />
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  id: state.giftReducer.id,
  name: state.giftReducer.name,
  description: state.giftReducer.description,
  price: state.giftReducer.price,
  tags: state.giftReducer.tags,
  urls: state.giftReducer.urls
});

const mapDispatchToProps = dispatch => ({
  getGift: id => {
    giftActionCreators.getGift(id);
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gift);
