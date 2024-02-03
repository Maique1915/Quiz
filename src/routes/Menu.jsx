import React from 'react';
import { Link } from 'react-router-dom';

const App = (props) => {
    return (
        <nav className='nav'>
            <ul className="menu">
                <li><label className="bar" htmlFor="horario">Grades</label></li>
                <li><label className="bar" htmlFor="grade">Gerar a sua</label></li>
                <li><label className="bar" htmlFor="quiz">Estude aqui</label></li>
            </ul>
        </nav>
    )
}

export default App;
