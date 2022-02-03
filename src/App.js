import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { CenterBox } from "./components/SharedComponents/CenterBox";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InputPayees from "./components/PayeePage/InputPayees";
import theme from './theme'
import Reciept from "./components/Receipt/Receipt";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CenterBox mt={5}>
        <Router>
          <Routes>
            <Route exact path="/" element={<InputPayees />} />
            <Route path="/receipt" element={<Reciept />} />
          </Routes>
        </Router>
      </CenterBox>
    </ChakraProvider>
  );
}

export default App;
