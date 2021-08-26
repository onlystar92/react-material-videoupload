import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MovieIcon from '@material-ui/icons/Movie';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core";
// import Utils from "../Utils";

const useStyles = makeStyles((theme) => ({
  list: {
    maxHeight: theme.spacing(72),
    overflow: 'auto'
  }
}))


function VideoList(props) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState();

  const handleListItemClick = async (event, index, key) => {
    setSelectedIndex(index);
  };

  const getFileName = (url) => {
    const filenameWithExtension = url.substring(url.lastIndexOf('/')+1);
    return filenameWithExtension.substr(0, filenameWithExtension.lastIndexOf("."));
  }

  return(
    <Grid className={classes.list}>
      <List component="nav" aria-label="main mailbox folders">
        {props.data.map((item, key) => (
          <Grid key={key}
          onClick={(e) => handleListItemClick(e, key, item.key)}>
            <ListItem
              button
              selected={selectedIndex === key}
              onClick={() => props.handleClick(item.key)}>
              <ListItemIcon><PermMediaIcon /></ListItemIcon>
              <ListItemText primary={getFileName(item.key)} />
            </ListItem>
            <Divider />
          </Grid>
          )
        )}
      </List>
    </Grid>
  )
}
export default VideoList;