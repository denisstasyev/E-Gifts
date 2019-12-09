import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import * as userActionCreators from "store/actions/user";

import { MyContainer } from "components/MyContainer";
import { Header } from "components/Header";
import { MyBox } from "components/MyBox";

import { useStyles } from "./styles";

const Profile = props => {
  const classes = useStyles();

  React.useEffect(() => {
    props.handleUpdateUser();
    // eslint-disable-next-line
  }, []);

  const [value, setValue] = React.useState(1);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return !props.isAuth ? (
    <Redirect to="/profile/signup" />
  ) : (
    <>
      <MyContainer>
        <Header topic={props.username} />
        <Box id="content" pb={2}>
          <MyBox
            title={
              props.firstName !== "" || props.lastName !== ""
                ? `${props.firstName} ${props.lastName}`
                : "User"
            }
          >
            <Grid container spacing={2}>
              {props.mail !== "" ? (
                <Grid item xs={12} sm={6}>
                  <Typography>Email: {props.mail}</Typography>
                </Grid>
              ) : null}
              {props.birthDate !== "" ? (
                <Grid item xs={12} sm={6}>
                  <Typography>Birth Date: {props.birthDate}</Typography>
                </Grid>
              ) : null}
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={props.isSmallMobile ? 12 : 6}>
                <Button fullWidth variant="outlined" color="primary">
                  Edit Profile
                </Button>
              </Grid>
              <Grid item xs={props.isSmallMobile ? 12 : 6}>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  onClick={handleClickOpen}
                >
                  Sign Out
                </Button>
              </Grid>
            </Grid>
          </MyBox>
          <MyBox title="Collection">
            <Tabs
              className={classes.tabs}
              value={value}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              centered
            >
              <Tab label="Sent E-Gifts" />
              <Tab label="Received E-Gifts" />
            </Tabs>
            <Typography>Soon</Typography>

            {/* {value === 0 ? 1 : null} */}

            {/* {props.availableGifts.length === 0 ? (
              <Typography>No gifts found, try to change Filters</Typography>
            ) : (
              <>
                <Typography className={classes.topic}>
                  Click on E-Gift below to choose
                </Typography>
                {!props.isMobile ? (
                  <GridList
                    className={classes.gridList}
                    cellHeight={300}
                    cols={3}
                  >
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
                        />
                      </GridListTile>
                    ))}
                  </GridList>
                ) : (
                  <GridList
                    className={classes.gridList}
                    cellHeight={200}
                    cols={2}
                  >
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
                        />
                      </GridListTile>
                    ))}
                  </GridList>
                )}
              </>
            )} */}
          </MyBox>
        </Box>
      </MyContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sign Out Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to sign out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={props.handleSignOut} color="primary" autoFocus>
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = state => ({
  username: state.userReducer.username,
  firstName: state.userReducer.firstName,
  lastName: state.userReducer.lastName,
  mail: state.userReducer.mail,
  birthDate: state.userReducer.birthDate,
  isAuth: state.userReducer.isAuth,
  isSmallMobile: state.settingsReducer.isSmallMobile
});

const mapDispatchToProps = dispatch => ({
  handleSignOut: () => dispatch(userActionCreators.signOut()),
  handleUpdateUser: () => dispatch(userActionCreators.updateUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
