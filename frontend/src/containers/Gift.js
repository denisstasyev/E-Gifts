import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Header from "components/Header";

import * as giftActionCreators from "store/actions/gift";

import * as config from "config";

import { Carousel, CarouselSlide } from "material-ui-carousel";
import { Card, CardMedia } from "@material-ui/core";

import axios from "axios";

const useStyles = makeStyles(theme => ({
  info: {
    display: "flex",
    flexWrap: "wrap"
  },
  carousel: {
    width: "800px"
  },
  details: {
    width: "",
    display: "flex",
    flexDirection: "column"
    // justifyContent: "center"
  },
  chip: {
    marginRight: theme.spacing(1)
  },
  buy: {
    margin: theme.spacing(2, 0, 2)
  }
}));

const Gift = props => {
  const classes = useStyles();

  const [link, setLink] = React.useState("");

  const [id, setId] = React.useState(
    props.location.pathname !== "/gallery/gift" &&
      props.location.pathname !== "/gallery/gift/"
      ? props.location.pathname.substring(
          props.location.pathname.lastIndexOf("/") + 1,
          props.location.pathname.length
        )
      : ""
  );

  React.useEffect(() => {
    if (props.id === null) {
      props.getGift(id);
    }
    // eslint-disable-next-line
  }, []);

  const handleBuy = () => {
    axios
      .get(`${config.BACKEND_SERVER}/buy_gift_ref?id=${props.id}`)
      .then(response => {
        if (response.data[config.RESULT]) {
          setLink(response.data[config.GIFT_VIEW_LINK]);
        } else {
          console.log("Cannot buy gift :(");
        }
      })
      .catch(() => {
        console.log("Cannot buy gift: network problem");
        //TODO: dispatch(loadFail("Network problem, try again later"));
      });
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Header topic={`Gift #${props.id}`} screen="gift" />
        <Box my={2} className={classes.box} width="100%">
          <div className={classes.info}>
            <div className={classes.carousel}>
              <Carousel>
                {//TODO: fix warning here
                props.urls.map((url, index) => (
                  <CarouselSlide key={index}>
                    <Card>
                      <CardMedia
                        image={`${config.BACKEND_SERVER}/${url}`}
                        title={props.name}
                        style={{
                          height: 0,
                          paddingTop: "100%"
                        }}
                      />
                    </Card>
                  </CarouselSlide>
                ))}
              </Carousel>
            </div>
            <div className={classes.details}>
              <Typography variant="h5">{props.name}</Typography>
              {/* <Chip //TODO: fix this
                className={classes.chip}
                key="1"
                size="medium"
                label={props.tags[0]}
                color="default"
              /> */}
              {/* <div> */}
              {/* {props.tags.forEach(tag => {
                console.log(tag);
                return (
                  <Chip
                    className={classes.chip}
                    // key={index}
                    size="medium"
                    label={tag}
                    color="default"
                  />
                );
              })} */}
              {/* </div> */}
              <Typography align="center">{props.description}</Typography>
              <Typography align="center">
                {props.price === 0 ? `FREE` : `${props.price} $`}
              </Typography>
              {link === "" ? null : (
                <React.Fragment>
                  <Typography align="center">
                    Your private link with gift:
                  </Typography>
                  <Typography
                    align="center"
                    component={Link}
                    to={link.substring(link.indexOf("/"), link.length)}
                  >
                    {link}
                  </Typography>
                </React.Fragment>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.buy}
                onClick={handleBuy}
              >
                Buy
              </Button>
            </div>
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
    dispatch(giftActionCreators.getGift(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gift);
