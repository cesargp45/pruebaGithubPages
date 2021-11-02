import React from 'react';
import { BrowserRouter as  Router, Switch, Route,  BrowserRouter,Redirect } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DrawerMenu from './Componentes/inicio/inicio';
import Start from './Componentes/Tabs/Start';

function App() {
  const [prefersDarkMode] = React.useState(true);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Start />
    </ThemeProvider>
  );
}
export default App;