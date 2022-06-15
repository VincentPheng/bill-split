import React, { useState } from 'react';
import { ChakraProvider, Box, Flex } from '@chakra-ui/react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Receipt from './components/ReceiptPage/Receipt';
import Result from './components/ResultPage/Result';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './components/LandingPage/LandingPage';

function App() {
  const [payeeTotal, setPayeeTotal] = useState(() => {
    const saved = localStorage.getItem('total');
    const initialValue = JSON.parse(saved);
    return initialValue || {};
  });

  return (
    <ChakraProvider>
      <Box minH="100vh">
        <Router>
          <Header />
          <Box mr='10rem' ml='10rem' mb='5rem'>
            <Routes>
              <Route path="/" element={<LandingPage />}>
                <Route
                  index
                  element={<Receipt setPayeeTotal={setPayeeTotal} />}
                />
                <Route
                  path="results"
                  element={<Result payeeTotal={payeeTotal} />}
                />
              </Route>
            </Routes>
          </Box>
          <Footer />
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
