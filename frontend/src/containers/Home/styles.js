import { makeStyles } from "@material-ui/core/styles";

import { hexToRgb } from "utils";

import NoEImage from "static/home/no_e.svg";
import NoGImage from "static/home/no_g.svg";

export const useStyles = makeStyles(theme => ({
  boxImage: {
    width: "100%",
    maxWidth: 200,
    margin: 40
  },
  boxImageNoE: {
    background: `url(${NoEImage})`,
    backgroundRepeat: "no-repeat"
  },
  boxImageE: {
    filter: `drop-shadow(0 5px 5px rgba(${hexToRgb(
      theme.palette.primary.main
    )}, 0.4))`
  },
  boxImageNoG: {
    background: `url(${NoGImage})`,
    backgroundRepeat: "no-repeat"
  },
  boxImageG: {
    filter: `drop-shadow(0 5px 5px rgba(${hexToRgb(
      theme.palette.primary.main
    )}, 0.4))`
  },
  boxText: {
    display: "flex",
    alignSelf: "flex-start"
  },
  boxTextLetter: {
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(2)
  },
  step: {
    marginBottom: theme.spacing(1)
  },
  fab: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "row-reverse"
  },
  icon: {
    marginRight: theme.spacing(1)
  },

  idea: {
    display: "flex",
    flexWrap: "wrap"
  },
  vr: {
    flexGrow: 1,
    // width: "100%",
    // height: "100%",
    minHeight: "400px",
    minWidth: "400px",
    maxHeight: "500px"
  },
  canvas: {
    outline: "none"
  }
}));
