import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import EmailIcon from "@material-ui/icons/AlternateEmail";
import HomeIcon from "@material-ui/icons/Home";
import GalleryIcon from "@material-ui/icons/Redeem";
import ProfileIcon from "@material-ui/icons/AccountCircle";

import { useStyles } from "./styles";

const MyContainer = props => {
  const classes = useStyles();

  return (
    <div className={!props.isPartlyMobile ? classes.root : classes.rootMobile}>
      <CssBaseline />
      <div className={classes.container}>
        <Container
          id="main-container"
          maxWidth={props.type === "small" ? "xs" : "lg"}
        >
          {props.children}
        </Container>
        {/* //TODO: add white box when too small height
        {document.getElementById("main-container") === null ? null : (
          <Box
            height={
              window.innerHeight -
                document.getElementById("main-container").offsetHeight <
              0
                ? 0
                : window.innerHeight -
                  document.getElementById("main-container").offsetHeight
            }
          />
        )} */}
        {props.showFooter === true && !props.isPartlyMobile && (
          <div className={classes.footer}>
            <Container maxWidth={"lg"}>
              <Box mt={2} p={2}>
                <Grid container>
                  <Grid item xs>
                    <Typography className={classes.title} variant="h5">
                      About Us
                    </Typography>
                    <Typography className={classes.context}>
                      This site was created by Denis Stasyev and Anton Chadov
                    </Typography>
                  </Grid>
                  <Grid item xs className={classes.mail}>
                    <Typography className={classes.title} variant="h5">
                      Contact Us
                    </Typography>
                    <Typography>
                      Have you encountered a problem on this site? Do you have
                      any ideas for improving E-Gifts? Feel free to contact us
                      via email
                    </Typography>
                    <Button
                      className={classes.mailButton}
                      href="mailto:support@e-gifts.site"
                    >
                      <EmailIcon className={classes.icon} />
                      Send Email
                    </Button>
                  </Grid>
                </Grid>
                <Typography className={classes.title} variant="h5">
                  Sitemap
                </Typography>
                <Button className={classes.link} component={Link} to="/home">
                  <HomeIcon className={classes.icon} />
                  Home
                </Button>
                <Button className={classes.link} component={Link} to="/gallery">
                  <GalleryIcon className={classes.icon} />
                  Gallery
                </Button>
                <Button className={classes.link} component={Link} to="/profile">
                  <ProfileIcon className={classes.icon} />
                  Profile
                </Button>
                <div className={classes.copyright}>
                  <Typography>© E-Gifts, 2019</Typography>
                  <Typography>E-Gifts - Brings gifts to AR & VR!</Typography>
                </div>
              </Box>
            </Container>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isPartlyMobile: state.settingsReducer.isPartlyMobile
});

export default connect(
  mapStateToProps,
  null
)(MyContainer);
