import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  views: {
    display: "flex",
    justifyContent: "center",
    overflow: "hidden"
  },
  image: {
    width: "100%"
  },
  stepper: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },

  details: {
    // width: "",
    display: "flex",
    flexDirection: "column"
    // justifyContent: "center"
  },
  chip: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  buy: {
    margin: theme.spacing(2, 0, 2)
  }
}));
