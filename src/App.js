import React, { useState } from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Receipt from './components/ReceiptPage/Receipt';
import Result from './components/ResultPage/Result';

function App() {
  const [payeeTotal, setPayeeTotal] = useState(() => {
    const saved = localStorage.getItem('total');
    const initialValue = JSON.parse(saved);
    return initialValue || {};
  });

  return (
    <ChakraProvider>
      <Box>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<Receipt setPayeeTotal={setPayeeTotal} />}
            />
            <Route
              path="/results"
              element={<Result payeeTotal={payeeTotal} />}
            />
          </Routes>
        </Router>
      </Box>
    </ChakraProvider>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <Counter />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <span>
    //       <span>Learn </span>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         React
    //       </a>
    //       <span>, </span>
    //       <a
    //         className="App-link"
    //         href="https://redux.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Redux
    //       </a>
    //       <span>, </span>
    //       <a
    //         className="App-link"
    //         href="https://redux-toolkit.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Redux Toolkit
    //       </a>
    //       ,<span> and </span>
    //       <a
    //         className="App-link"
    //         href="https://react-redux.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         React Redux
    //       </a>
    //     </span>
    //   </header>
    // </div>
  );
}

export default App;
