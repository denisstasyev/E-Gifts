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
import Grid from "@material-ui/core/Grid";

import Header from "components/Header";

import image from "static/gifts/template.jpg";

const useStyles = makeStyles(theme => ({
  backIcon: {
    marginRight: theme.spacing(1)
  },
  buy: {
    margin: theme.spacing(2, 0, 2)
  }
}));

const Gift = props => {
  const classes = useStyles();

  if (props.match.params.id !== props.id) {
    //TODO: update gift
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Header topic={`Gift #${props.id}`} />
        <Box my={2} className={classes.box} width="100%">
          <img //TODO: fix in the future
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
          <Grid>
            <Typography align="center">{props.name}</Typography>
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
          </Grid>
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

export default connect(
  mapStateToProps,
  null
)(Gift);
