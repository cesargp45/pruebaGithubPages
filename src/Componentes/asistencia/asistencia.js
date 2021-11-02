import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField,Button,Grid } from '@material-ui/core';
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
    marginLeft:'22%',
    //boxShadow: '0px 4px 4px 4px rgba(0, 0, 0, 0.2)'
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
  col9: {
    marginLeft:'50%',
    width:'36%',
  },
  alerta: {
    marginTop:'1.5%'
  },
}));


export default function Asistencia() {
 
  const classes = useStyles();
  const [mensaje, setMensaje] = React.useState("");
  const [carnet, setCarnet] = React.useState("");
  const [nombre, setNombre] = React.useState("");
  const [evento, setEvento] = React.useState("");
  const [id_evento, setIdEvento] = React.useState("");
  const [openExito, setOpenExito] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [photoUrl, setPhotoUrl] = React.useState('');
  const [photo, setPhoto] = React.useState({ name: '', extension: '', base64: '', completeBase64: '' });
  localStorage.setItem("mensaje","Error");
  const handleCarnet = (e) =>{setCarnet(e.target.value);} 
  const handleNombre= (e) =>{setNombre(e.target.value);}  
  const handleEvento= (e) =>{setEvento(e.target.value);} 
  const handleIdEvento= (e) =>{setIdEvento(e.target.value);} 


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
    if(carnet==="" ||nombre===""||evento===""||id_evento ==="" || photo.base64 === ""){
       setMensaje("Rellene todos los campos y adjunte una captura")
       alertaError();
       return 0;
    }

    var bandera = false;

    for (let index = 0; index < id_evento.length; index++) {
        const element = id_evento[index];
        let ascii = element.charCodeAt(0);
        if(ascii < 48 || ascii > 57){
            bandera = true;
            break;
        }
    }

    if(bandera){
       setMensaje("El id del evento debe contener solo numeros")
       alertaError();
       return 0;
    }

    const body = {
        carnet:carnet,
        nombre:nombre,
        nombreEvento:evento,
        idEvento:parseInt(id_evento,10),
        imagen64:photo.base64
      };
    const requestOptions = {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(body)
    };
    const response = await fetch(`${api_host}/enviarAsistencia`, requestOptions)
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
      document.getElementById("Evento").value = "";
      document.getElementById("IdEvento").value = "";
      setCarnet("");
      setNombre("");
      setEvento("");
      setIdEvento("");
      setPhoto({ name: '', extension: '', base64: '', completeBase64: '' });
  }
  
  
  const setPhotoFile = (event) => {
    try {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function () {
            setPhoto({ name: event.target.files[0].name.split('.')[0], extension: event.target.files[0].type.split('/')[1], base64: reader.result.split(',')[1], completeBase64: reader.result });
        };
        reader.onerror = function (error) {
            setPhoto({ name: '', extension: '', base64: '', completeBase64: '' });
            alert('Error al cargar tu foto');
        };
    } catch (e) {
    }
}
  
  return (
    <div className={classes.principal} >
        <div className={classes.encabezado}>
                <Paper elevation={3}variant="outlined" className={classes.paper2} >
                    <AssignmentIndIcon className={classes.punto} ></AssignmentIndIcon>
                    <Typography className={classes.typo2}>Asistencia</Typography>  
                </Paper>
        </div>
        <div className={classes.formulario}>
            <div className={classes.columna1}>
              <div className={classes.fila1}>
                  <TextField placeholder="Nombre" id="Nombre" label="Nombre" variant="outlined" onChange={handleNombre} className={classes.col1}/> 
                  <TextField placeholder="Carnet" id="Carnet" label="Carnet" variant="outlined" onChange={handleCarnet} className={classes.col1} />
              </div>
              <div className={classes.fila1}>
              <TextField placeholder="Evento" id="Evento" label="Evento" variant="outlined" onChange={handleEvento} className={classes.col1} />
              <TextField  placeholder="ID Evento" id="IdEvento" label="ID Evento" variant="outlined" onChange={handleIdEvento} className={classes.col1}/>
              </div>

              <div className={classes.fila1}>
              <Grid item xs={6} style={{ marginTop: '1.4vh' }}>
                <Button
                    variant="contained"
                    component="label"
                    className={classes.col9}
                    style={{ width: '100%' }}
                >
                    Cargar foto
                    <input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={(event) => setPhotoFile(event)}
                        hidden
                    />
                </Button>
            </Grid>
              </div>

              <div>
              <Grid item xs={12}>
                  <center>
                      <img src={photo.completeBase64} alt='Foto no cargada' style={{ maxHeight: '150px', maxWidth: '400px', height: 'auto' }} />
                  </center>
              </Grid>
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
                     Asistencia enviada Correctamente.
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
