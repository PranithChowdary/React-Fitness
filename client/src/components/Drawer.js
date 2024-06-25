import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WorkIcon from '@mui/icons-material/Work';
import MapIcon from '@mui/icons-material/Map';
import FlagIcon from '@mui/icons-material/Flag';
import ThreePIcon from '@mui/icons-material/ThreeP';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';


const CustomDrawer = ({ open, onClose, pageClick }) => {
    return (
        <Drawer variant="temporary" open={open} onClose={onClose} sx={{ width: '430px' }}>
            <div>
                <List>
                    <br/>
                    <br/>
                    <ListItem button onClick={() => pageClick('/home')}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button onClick={() => pageClick('/career')}>
                        <ListItemIcon>
                            <WorkIcon />
                        </ListItemIcon>
                        <ListItemText primary="Career" />
                    </ListItem>
                    <ListItem button onClick={() => pageClick('/travel')}>
                        <ListItemIcon>
                            <MapIcon />
                        </ListItemIcon>
                        <ListItemText primary="Travel" />
                    </ListItem>
                    <ListItem button onClick={() => pageClick('/goals')}>
                        <ListItemIcon>
                            <FlagIcon />
                        </ListItemIcon>
                        <ListItemText primary="Goals" />
                    </ListItem>
                    <ListItem button onClick={() => pageClick('/personal')}>
                        <ListItemIcon>
                            <ThreePIcon />
                        </ListItemIcon>
                        <ListItemText primary="Personals" />
                    </ListItem>
                    <ListItem button onClick={() => pageClick('/docs')}>
                        <ListItemIcon>
                            <InventoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Documents" />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    );
};

export default CustomDrawer;