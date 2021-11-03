import React, { useEffect, useState } from "react";
import { withStyles } from '@material-ui/core/styles';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow,Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import api_host from '../conf/creds';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';



const styles = theme => ({
    root: {
        width: '100%',
        height:'95vh',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto'
    },
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
          }
    },
    paper8: {
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    textfields:{
        marginTop:'5%'
    },
    columna2: {
        marginRight:'5%',
        width:'45%',
        float: 'right',
        height: '50%'
    },
    text: {
        marginTop:'10%',
        width:'100%',
        height:'100%'
      },
    buscador: {
        marginTop:'1%',
      },
    
});

const ProcessTable2 = (props) => {
    const { classes } = props;
    
    const [ruta, setRuta] = useState("");
    const [search, setSearch] = useState('');
    const [actualizar, setActualizar] = useState(true);
    const [filtro, setFiltro] = useState('0');

    const handleFiltro = (event) => {
        setFiltro(event.target.value);
      };
    

    let datitos = [
        {carnet: "20190877",idEvento: "5074",nombreEvento: "redes2",fecha: "25-09-2021",nombre: "cesar"},
        {carnet: "20180181",idEvento: "5075",nombreEvento: "redes2",fecha: "25-09-2021",nombre: "cesar"},
        {carnet: "20186934",idEvento: "5074",nombreEvento: "redes2",fecha: "25-09-2021",nombre: "cesar"},
        {carnet: "20186366",idEvento: "5073",nombreEvento: "redes2",fecha: "25-09-2021",nombre: "cesar"},
        {carnet: "20186302",idEvento: "5073",nombreEvento: "redes2",fecha: "25-09-2021",nombre: "cesar"},
        {carnet: "20186752",idEvento: "5072",nombreEvento: "redes2",fecha: "25-09-2021",nombre: "cesar"},
        {carnet: "20188902",idEvento: "5074",nombreEvento: "redes2",fecha: "25-09-2021",nombre: "cesar"},
        {carnet: "20186896",idEvento: "5070",nombreEvento: "redes2",fecha: "25-09-2021",nombre: "cesar"},
    ];

    const [data, setData] = useState([]);


    const [open1, setOpen1] = useState(false);

    const handleOpen1 = (route) => {
        setOpen1(true);
        setRuta(route);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            getTabla ();
            
        }, 5000);

            getTabla ();

        return () => {
            clearInterval(timer);
        }
    }, []);

    
    const getDatos = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Content-Security-Policy': 'upgrade-insecure-requests'
            },
        };
        const response = await fetch(`${api_host}/getAsistencias`, requestOptions)
        const json = await response.json()
        return json
    }

    const getTabla = async () => {
            if(document.getElementById("Search").value ==="" ||
               document.getElementById("Search").value === undefined ||
               document.getElementById("Search").value === null){
                    const datos = await getDatos();
                    setData(datos);
               }
    }


    const searchFriend = (val) => {
        setSearch(val);
        const newFriends = data.map((friend) => (
            filtro === '0' ? (friend.carnet.toLowerCase().indexOf(val.toLowerCase()) !== -1 ? { ...friend, show: true } : { ...friend, show: false } ) : (friend.idEvento.toLowerCase().indexOf(val.toLowerCase()) !== -1 ? { ...friend, show: true } : { ...friend, show: false })
            
        ));
        setData(newFriends);
    }


    return(
        <>
       <TextField 
                placeholder="Search Carnet" 
                id="Search" 
                label="Search Carnet" 
                variant="outlined" 
                value={search}
                onChange={(e) => searchFriend(e.target.value)}
                className={classes.buscador}
        /> 
        <div className={classes.radiogrupo}>
            <FormControl component="fieldset">
              <RadioGroup aria-label="filtro" name="filtro1" value={filtro} onChange={handleFiltro}>
                <div className={classes.radio1}> 
                <FormControlLabel value="0" control={<Radio />} label="Carnet"  />
                <FormControlLabel value="1" control={<Radio />} label="ID Evento"/>
                </div>
              </RadioGroup>
            </FormControl>
        </div>
        <Paper className={classes.root}>
            
            <TableContainer style={{ maxHeight: '80vh' }}>
            <Table className={classes.table} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.head} align="center">Carnet</TableCell>
                        <TableCell className={classes.head} align="center">Nombre</TableCell>
                        <TableCell className={classes.head} align="center">Evento</TableCell>
                        <TableCell className={classes.head} align="center">Fecha</TableCell>
                        <TableCell className={classes.head} align="center">ID Evento</TableCell>
                        <TableCell className={classes.head} align="center">Servidor</TableCell>
                        <TableCell className={classes.head} align="center">Captura</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data
                        .map((row, index) => (
                            <TableRow className={classes.row} key={index} style= {{display:(row.hasOwnProperty('show') ? row.show ? 'table-row' : 'none' : 'table-row')}}>
                                <TableCell align="center">{row.carnet}</TableCell>
                                <TableCell align="center">{row.nombre}</TableCell>
                                <TableCell align="center">{row.nombreEvento}</TableCell>
                                <TableCell align="center">{row.fecha}</TableCell>
                                <TableCell align="center">{row.idEvento}</TableCell>
                                <TableCell align="center">{row.servidor}</TableCell>
                                <TableCell align="center">
                                    <Button variant="contained" color="secondary" onClick={() => handleOpen1(row.rutaImagen)}>
                                        <VisibilityIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            </TableContainer>
            
            <div>
                <Modal
                  open={open1}
                  onClose={handleClose1}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <div style={{top:'50%',left:'50%', transform: 'translate(-50%, -50%)'}} className={classes.paper8}>
                    <h2 id="simple-modal-title" align = 'center'>Captura Asistencia</h2>
                    <div>
                        <Grid item xs={12}>
                            <center>
                                <img src={ruta} alt='Foto no cargada' style={{ maxHeight: '700px', maxWidth: '500px', height: 'auto' }} />
                            </center>
                        </Grid>
                     </div>
                  </div>
                </Modal>
           </div>

        </Paper>
        </>
    )
}

export default withStyles(styles)(ProcessTable2);