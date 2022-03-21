import React from "react";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import useStyles from "./style";

const SearchBar = ({ placeholder, value, onChange, onCancel, ...props }) => {
  const classes = useStyles();

  return (
    <InputBase
      autoComplete="off"
      name="searchbar"
      classes={classes}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      startAdornment={<SearchIcon />}
      endAdornment={
        value && (
          <IconButton size="small" onClick={onCancel}>
            <CloseIcon />
          </IconButton>
        )
      }
      {...props}
    />
  );
};

export default SearchBar;
