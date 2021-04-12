import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function Search(props) {
  const classes = useStyles();
  const [search_value, setSearchValue] = React.useState(null);

  return (
    <React.Fragment>
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search..."
        inputProps={{ 'aria-label': 'search...' }}
        onInput={(e) => setSearchValue(e.target.value)}
      />
      <IconButton className={classes.iconButton} aria-label="search" onClick={() => props.search(search_value)} >
        <SearchIcon/>
      </IconButton>
	</Paper>
    </React.Fragment>
  );
}
