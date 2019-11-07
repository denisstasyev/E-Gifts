import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  alert: {
    color: "red",
    marginTop: theme.spacing(1)
  },
  chips: {
    width: "100%", // Fix IE 11 issue
    marginTop: theme.spacing(1)
  },
  info: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  chip: {
    margin: theme.spacing(1)
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
