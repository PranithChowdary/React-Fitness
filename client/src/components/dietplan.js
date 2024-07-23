import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
// import ChatComponent from './chat';
import DietPlan from './Diet';
import Archive from './Archive'
import SavedPlans from './Browseplan';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                    <Tab label="Create Diet Plan" {...a11yProps(0)} />
                    <Tab label="Browse Diets" {...a11yProps(1)} />
                    <Tab label="Archieved Diets" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <DietPlan />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                {/* <SaveDiet /> */}
                Save Diet
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                {/* <ChatComponent /> */}
                Archieve Diet
                {/* <ArchiveDiet /> */}
            </CustomTabPanel>
        </Box>
    );
}