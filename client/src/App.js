import Container from "./globalCSS";
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from "components/appBar";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "routes";
import { AppContextProvider } from "contexts/appContext";
import { ToastContextProvider } from "contexts/toastContext";

function App() {
  
  return (
    <ToastContextProvider>
      <AppContextProvider>
        <Router>
          <Container>
            <AppBar />
            <Content />
          </Container>
        </Router>
      </AppContextProvider>
    </ToastContextProvider >
  );
}

export default App;

function Content() {
  
  return (
    <main className="content">
      <Toolbar />
      <Routes />
    </main>
  )
}