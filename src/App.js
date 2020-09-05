import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import Dashboard from './pages/Dashboard';

function App() {
  const room = useSelector(state => {
    console.log(state)
  })

  return (
    <div className="App">
    <Dashboard/>
    </div>
  );
}

export default firestoreConnect((props) => [
  {collection: 'roomtype'}
])(App);
