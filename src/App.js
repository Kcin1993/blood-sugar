import React from 'react';
import './styles/index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './routes/Home';

const App = () => (
  <Router>
    <div className="App">
      <Route exact path="/" component={Home} />
    </div>
  </Router>
);

export default App;
