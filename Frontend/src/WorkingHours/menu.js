import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { history } from "../_helpers";
import { withRouter } from "react-router-dom";

export function menu(props) {

  const gotoadd = (event) => {
    event.preventDefault();
    history.push("/add");
  };
  const gotoshow = (event) => {
    event.preventDefault();
    history.push("/show");
  };
  const gotologout = (event) => {
    event.preventDefault();
    history.push("/login");
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={gotoadd}>Add your working hours</MenuItem>
        <MenuItem onClick={gotoshow}>show working hours</MenuItem>
        <MenuItem onClick={gotologout}>Logout</MenuItem>
      
        
      </Menu>
    </div>
  );
}
export default withRouter(menu);
