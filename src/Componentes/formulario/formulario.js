import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField,Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import api_host from '../conf/creds';

const useStyles = makeStyles((theme) => ({
  principal: {
     height:'90vh',
     width:'100%',
    },
 encabezado: {
    width:'55%',
    height:'6%',
    marginLeft:'22%',
    marginTop:'0%',
    backgroundColor:'#3B48A0 ',
    },
  formulario: {   
    backgroundColor:'inherit',
    width:'55%',
    height:'80%',
    marginTop:'0%',
    marginLeft:'22%',
    //boxShadow: '2px 4px 4px 3px rgba(0, 0, 0, 0.2)'
    },
  paper2: {   
    padding: '1%',
    backgroundColor:'#3B48A0 ',
    height:'100%'
  },
  typo: {
    float: 'left', 
  },
  typo2: {
    float: 'right',
    marginRight:'30%',
    width:'25%',
    height:'100%',
  },
  punto: {
    marginLeft:'40%',
    float: 'left',  
  },
  fila1: {
    marginTop:'7%'
  },
  fila3: {
    float: 'rigth',
  },
  col1: {
    marginLeft:'9%',
    width:'36%'
  },

  text: {
    width:'100%',
    height:'100%'
  },

  columna2: {
    marginRight:'5%',
    width:'45%',
    float: 'right',
    height: '50%'
  },

  col2: {
    marginLeft:'33%',
    width:'36%',
  },
  alerta: {
    marginTop:'1.5%'
  },
}));


export default function Formulario() {
 
  const classes = useStyles();
  const [mensaje, setMensaje] = React.useState("");
  const [carnet, setCarnet] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [curso_proyecto, setCursoProyecto] = React.useState("");
  const [cuerpo, setCuerpo] = React.useState("");
  const [openExito, setOpenExito] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  localStorage.setItem("mensaje","Error");
  const handleCarnet = (e) =>{setCarnet(e.target.value);} 
  const handleNombre= (e) =>{setNombre(e.target.value);}  
  const handleCursoProyecto = (e) =>{setCursoProyecto(e.target.value);}  
  const handleCuerpo = (e) =>{setCuerpo(e.target.value);}  

  const alertaExito = () => {
    setOpenExito(true)
    setTimeout(() => {
        setOpenExito(false)
      }, 4000);     
  }
  
  const alertaError = () => {
    setOpenError(true)
    setTimeout(() => {
        setOpenError(false)
      }, 4000);     
  }

 
  const guardar = async () =>{
    if(carnet==="" ||nombre===""||curso_proyecto===""||cuerpo ===""){
       setMensaje("Rellene todos los campos.")
       alertaError();
       return 0;
    }
    const body = {
        carnet:carnet,
        nombre:nombre,
        curso_proyecto:curso_proyecto,
        cuerpo:cuerpo
      };
   const requestOptions = {
       method: 'POST',
       headers: { 'Content-Type': 'application/json',
                  'Content-Security-Policy': 'upgrade-insecure-requests'
       },
       body: JSON.stringify(body)
    };
    const response = await fetch(`${api_host}/enviarReporte`, requestOptions)
    const json = await response.json()
    return json
  }
  
 
 const confirmarGuardar = async () => {
    const nueva = await guardar()
    if (nueva === 0){return;}
    const res = nueva.respuesta
    if(res === 1){
      alertaExito();
    }else{
       setMensaje("Ocurrio un Error al enviar los datos al servidor")
       alertaError();
    }

      document.getElementById("Carnet").value = "";
      document.getElementById("Nombre").value = "";
      document.getElementById("Cuerpo").value = "";
      document.getElementById("Curso_Proyecto").value = "";
      setCarnet("");
      setNombre("");
      setCuerpo("");
      setCursoProyecto("");
  }
  
  
  return (
    <div className={classes.principal} >
        <div className={classes.encabezado}>
                <Paper elevation={3}variant="outlined" className={classes.paper2} >
                    <AssignmentIndIcon className={classes.punto} ></AssignmentIndIcon>
                    <Typography className={classes.typo2}>Reporte</Typography>  
                </Paper>
        </div>
        <div className={classes.formulario}>
        <div className={classes.columna2}>
              <TextField
                id="outlined-multiline-static"
                id="Cuerpo"
                label="Cuerpo"
                placeholder="Cuerpo"
                variant="outlined"
                multiline
                onChange={handleCuerpo}
                rows={12}
                className={classes.text}
              />
            </div>
            <div className={classes.columna1}>
              <div className={classes.fila1}>
                  <TextField placeholder="Nombre" id="Nombre" label="Nombre" variant="outlined" onChange={handleNombre} className={classes.col1}/> 
              </div>
              <div className={classes.fila1}>
              <TextField placeholder="Carnet" id="Carnet" label="Carnet" variant="outlined" onChange={handleCarnet} className={classes.col1} />
              </div>

              <div className={classes.fila1}>
                  <TextField  placeholder="Curso/Proyecto" id="Curso_Proyecto" label="Curso/Proyecto" variant="outlined" onChange={handleCursoProyecto} className={classes.col1}/>
              </div>
            </div>
          
          
            <div className={classes.fila1}>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={confirmarGuardar}
                    className={classes.col2}
                    >       
                    Enviar
                </Button>
            </div>

            <div className={classes.root,classes.alerta}>
                <Collapse in={openExito}>
                    <Alert
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpenExito(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    variant="filled"
                    >
                     Reporte enviado Correctamente.
                    </Alert>
                </Collapse>
            </div>


            <div className={classes.root,classes.alerta}>
                <Collapse in={openError}>
                    <Alert
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpenError(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    variant="filled"
                    severity="error"
                    >
                     {mensaje}
                    </Alert>
                </Collapse>
            </div>

        </div>
    </div>
  );
}
