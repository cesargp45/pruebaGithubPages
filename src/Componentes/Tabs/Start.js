import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

import Formulario from '../formulario/formulario';
import Asistencia from '../asistencia/asistencia';
import ProcessTable from '../tablaReportes/tablaReportes';
import ProcessTable2 from '../tablaAsistencia/tablaAsistencia';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    
    pestaña: {
        backgroundColor: '#424242',
    },
}));


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={1} >
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Start() {
    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Grid container className={classes.root}>          
                <AppBar position="left" className={classes.pestaña}>
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" variant="fullWidth">
                        <Tab label="Reporte" {...a11yProps(0)} />
                        <Tab label="Asistencia" {...a11yProps(1)} />
                        <Tab label="Lista Reportes" {...a11yProps(2)} />
                        <Tab label="Lista Asistencias" {...a11yProps(3)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0} style = {{"width": '100%'}}>
                        <Formulario />
                
                </TabPanel>

                <TabPanel value={value} index={1} style = {{"width": '100%'}}>
                    <Asistencia />
                </TabPanel>

                <TabPanel value={value} index={2} style = {{"width": '100%'}}>
                    <ProcessTable />
                </TabPanel>

                <TabPanel value={value} index={3} style = {{"width": '100%'}}>
                    <ProcessTable2 />
                </TabPanel>
        </Grid>
        
    );
}