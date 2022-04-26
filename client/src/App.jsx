import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './comp/Header';
import Main from './comp/Main';

export default function App() {
  return (
    <div>
      <Router>
          <Header />
          <Main />
      </Router>
    </div>
  )
}
