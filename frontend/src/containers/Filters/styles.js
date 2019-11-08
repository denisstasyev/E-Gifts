import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
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
  }
}));
