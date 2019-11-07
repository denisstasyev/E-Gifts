import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: theme.palette.background.paper
  },
  chip: {
    marginRight: theme.spacing(1)
  },
  fixedButton: {
    position: "absolute",
    bottom: theme.spacing(9),
    left: theme.spacing(2)
  },
  icon: {
    marginRight: theme.spacing(1)
  }
}));
