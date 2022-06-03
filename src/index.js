import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Scramble from './scramble';

const App = () => {
    return(
        <div>
            <h1> Word Scramble </h1>
            <Scramble />
            
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app'),
);