import React, { useEffect } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  customizeToolbar: {
    minHeight: theme.spacing(10),
  },
  "&.MuiAppBar-colorPrimar": {
    background: "#55555",
  },
}));

const TopAppBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense" className={classes.customizeToolbar}>
          <Grid container justifyContent="space-between">
            <Typography variant="h4" color="inherit">
              Video Upload & List
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default TopAppBar;
