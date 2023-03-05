import React from 'react';
import './card.css';
// Iimport NavBar from './navbar/navbar.js';
function Card(props) {
	return <div className='card'>{props.children}</div>;
}

export default Card;
