import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { NavLink, Route, Link } from 'react-router-dom';
// import { Route } from 'react-router'
import GamesPage from './GamesPage';
import GameFormPage from './GameFormPage';

// const ActiveLink = ({ label, to, activeOnlyWhenExact }) => (
//   <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
//     <Link className={match ? 'active item' : 'item'} to={to}>{label}</Link>
//   )} />
// );

function App() {
  return (
    <div className="ui form">
      <div className="ui three item menu">
        {/* <ActiveLink activeOnlyWhenExact to="/" label="Home" />
          <ActiveLink activeOnlyWhenExact to="/games" label="Games" />
          <ActiveLink activeOnlyWhenExact to="/games/new" label="Add New Game" /> */}

        <NavLink className="item" activeClassName="active" exact to="/">Home</NavLink>
        <NavLink className="item" activeClassName="active" exact to="/games">Games</NavLink>
        <NavLink className="item" activeClassName="active" exact to="/games/new">Add New Game</NavLink>
      </div>
      
      <Route exact path="/games" component={GamesPage} />
      <Route path="/games/new" component={GameFormPage} />
      <Route path="/game/:_id" component={GameFormPage} />
    </div>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       <NavLink  to='games'>Games </NavLink  >
    //     </p>
    //     <Route path="/games" component={GamesPage} />
    //   </header>
    // </div>
  );
}

export default App;
