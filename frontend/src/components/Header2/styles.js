import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    display: "flex"
  },
  logoIcon: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(-2)
  },
  topic: {
    flexShrink: 0
  },
  navigation: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end"
  },
  link: {
    marginLeft: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  selectedLink: {
    marginLeft: theme.spacing(2),
    color: theme.palette.primary.main
  },
  icon: {
    marginRight: theme.spacing(1)
  }
}));
