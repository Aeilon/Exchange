import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import Exchange from "./components/Exchange";
import { createMuiTheme,ThemeProvider } from '@material-ui/core/styles';
import {deepPurple} from '@material-ui/core/colors';

const App = () => {
  const theme = createMuiTheme({
    palette: {
      primary: deepPurple,
      secondary: {
        main: '#3eff33',
      },
    },
    status: {
      danger: 'orange',
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Nav />
        <Exchange />
      </ThemeProvider>
    </div>
  );
};

export default App;
