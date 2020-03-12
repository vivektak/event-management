import React from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Badge,
    Menu,
    MenuItem

} from "@material-ui/core";


const Header = (props) => {
    return ( <AppBar position="static">
    <Toolbar>
        <Typography variant="h5" style={{ flexGrow: 1, textAlign : 'left' }}>
            Event Management
        </Typography>
        <Typography variant="h5" style={{ flexGrow: 1, textAlign : 'right',color: 'white', textDecoration: 'blink' }} >
            {props.type == 'Add' ?<Link to='/add-event' >Add Event</Link> : <Link to='/event-list' >Event List</Link>}
        </Typography>
    </Toolbar>
    </AppBar>
);
}
 
export default Header;