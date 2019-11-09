import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  text: {
    alignSelf: "flex-start"
  },

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
  },
  close: {
    position: "fixed",
    bottom: theme.spacing(9),
    left: theme.spacing(2)
  }
}));
