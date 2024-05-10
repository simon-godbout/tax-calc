import React from 'react';
import { Calculator } from './components/Calculator';
import { AppBar } from './layout/AppBar';

function App() {
  return (
    <div className="App">
      <AppBar />
      <Calculator />
    </div>
  );
}

export default App;
