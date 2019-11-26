import { makeStyles } from "@material-ui/core/styles";

import { hexToRgb } from "utils";

import NoTopImage from "static/view/no_top.svg";

export const useStyles = makeStyles(theme => ({
  welcome: {
    display: "flex",
    flexDirection: "column"
  },
  boxImage: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 200,
    margin: 40
  },
  boxImageNoTop: {
    background: `url(${NoTopImage})`,
    backgroundRepeat: "no-repeat"
  },
  boxImageTop: {
    filter: `drop-shadow(0 5px 5px rgba(${hexToRgb(
      theme.palette.primary.main
    )}, 0.4))`
  },
  boom: {
    position: "absolute",
    left: 100,
    bottom: 120
  },

  fab: {
    alignSelf: "flex-end",
    marginTop: theme.spacing(1)
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  button: {
    position: "absolute",
    bottom: 0,
    right: 0
  },
  text: {
    alignSelf: "flex-start"
  }
}));
