import React, { useEffect, useState } from "react";
import { withStyles } from '@material-ui/core/styles';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import api_host from '../conf/creds';


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

const ProcessTable = (props) => {
    const { classes } = props;
    
    const [nombre, setNombre] = useState("");
    const [carnet, setCarnet] = useState("");
    const [fecha, setFecha] = useState("");
    const [cuerpo, setCuerpo] = useState("");
    const [servidor, setServidor] = useState("");
    const [curso_proyecto, setCurso_Proyecto] = useState("");


    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const url = "http://52.32.30.83:2801/";

    const [open1, setOpen1] = useState(false);

    const handleOpen1 = (nombre,carnet,fecha,cuerpo,servidor,curso_proyecto) => {
        setOpen1(true);
        setNombre(nombre);
        setCarnet(carnet);
        setFecha(fecha);
        setCuerpo(cuerpo);
        setServidor(servidor);
        setCurso_Proyecto(curso_proyecto);
    };

    const handleClose1 = () => {
        setOpen1(false);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            getTabla ();
        }, 5000);

        getTabla();

        return () => {
            clearInterval(timer);
        }
    }, []);

    
    const getDatos = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(`${api_host}/getReportes`, requestOptions)
        const json = await response.json()
        return json
    }

    const getTabla = async () => {
        const datos = await getDatos();
        setData(datos);
    }


    const searchFriend = (val) => {
        setSearch(val);
        const newFriends = data.map((friend) => (
            friend.carnet.toLowerCase().indexOf(val.toLowerCase()) !== -1 ? { ...friend, show: true } : { ...friend, show: false }
        ));
        setData(newFriends);
    }

    return(
        <>
       <TextField 
                placeholder="Search" 
                id="Search" 
                label="Search" 
                variant="outlined" 
                value={search}
                onChange={(e) => searchFriend(e.target.value)}
                className={classes.buscador}
            /> 
        <Paper className={classes.root}>
            
            <TableContainer style={{ maxHeight: '80vh' }}>
            <Table className={classes.table} stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.head} align="center">Carnet</TableCell>
                        <TableCell className={classes.head} align="center">Nombre</TableCell>
                        <TableCell className={classes.head} align="center">Proyecto</TableCell>
                        <TableCell className={classes.head} align="center">Fecha</TableCell>
                        <TableCell className={classes.head} align="center">Servidor</TableCell>
                        <TableCell className={classes.head} align="center">Ver Reporte</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data
                        .map((row, index) => (
                            <TableRow className={classes.row} key={index} style= {{display:(row.hasOwnProperty('show') ? row.show ? 'table-row' : 'none' : 'table-row')}}>
                                <TableCell align="center">{row.carnet}</TableCell>
                                <TableCell align="center">{row.nombre}</TableCell>
                                <TableCell align="center">{row.curso_proyecto}</TableCell>
                                <TableCell align="center">{row.fecha}</TableCell>
                                <TableCell align="center">{row.servidor}</TableCell>
                                <TableCell align="center">
                                    <Button variant="contained" color="primary" onClick={() => handleOpen1(row.nombre,row.carnet,row.fecha,row.cuerpo,row.servidor,row.curso_proyecto)}>
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
                    <h2 id="simple-modal-title" align = 'center'>Reporte</h2>
                    <div className={classes.columna2}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Cuerpo"
                        variant="outlined"
                        multiline
                        defaultValue={cuerpo}
                        className={classes.text}
                        rows={19}
                        disabled = 'True'
                    />
                    </div>
                    <div className={classes.columna1}>
                    <TextField defaultValue={carnet} disabled = 'True' label="Carnet" variant="outlined" className={classes.textfields}/>
                    <TextField defaultValue={nombre} disabled = 'True' label="Nombre" variant="outlined" className={classes.textfields}/>
                    <TextField defaultValue={curso_proyecto} disabled = 'True' label="Curso/Proyecto" variant="outlined" className={classes.textfields}/>
                    <TextField defaultValue={fecha} disabled = 'True' label="Fecha" variant="outlined" className={classes.textfields}/>
                    <TextField defaultValue={servidor} disabled = 'True' label="Procesado por" variant="outlined" className={classes.textfields}/> 
                    </div>
                  </div>
                </Modal>
           </div>

        </Paper>
        </>
    )
}

export default withStyles(styles)(ProcessTable);