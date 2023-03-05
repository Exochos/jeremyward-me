import './card.css';
// import NavBar from './navbar/navbar.js';
function Card(props) {
  return (
    <div className="card">
      {props.children}
    </div>
  );
}

export default Card;
