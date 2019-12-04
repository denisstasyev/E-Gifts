import { makeStyles } from "@material-ui/core/styles";

import { MOBILE_WIDTH } from "configs/CSSvariables";

import { hexToRgb } from "utils";

import NoEImage from "static/home/no_e.svg";
import NoGImage from "static/home/no_g.svg";

export const useStyles = makeStyles(theme => ({
  idea: {
    display: "flex",
    [`@media (max-width: ${MOBILE_WIDTH}px)`]: {
      flexDirection: "column"
    }
  },
  vr: {
    flexGrow: 1,
    width: "50%",
    height: "400px",
    [`@media (max-width: ${MOBILE_WIDTH}px)`]: {
      width: "100%"
    }
  },
  ideaTitle: {
    // width: "30%",
    // flexShrink: 1,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [`@media (max-width: ${MOBILE_WIDTH}px)`]: {
      alignItems: "center",
      textAlign: "center"
    }
  },

  fab: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "row-reverse"
  },
  icon: {
    marginRight: theme.spacing(1)
  },

  moreDetails: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },

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
    alignSelf: "flex-start",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  boxTextLetter: {
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(2)
  },
  step: {
    marginLeft: theme.spacing(1)
  },
  stepMobile: {
    marginBottom: theme.spacing(1)
  },

  mail: {
    marginTop: theme.spacing(1)
  }
}));
