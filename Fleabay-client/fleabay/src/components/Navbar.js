import React from "react";
import { NavLink /*, Link */ } from "react-router-dom";

const NavBar = props => {
  const { currentUser } = props;

  const handleSignOutClick = event => {
    event.preventDefault();

    if (typeof props.onSignOut === "function") {
      props.onSignOut();
    }
  };

  return (
    <nav className="NavBar">
      <NavLink exact to="/">
        Welcome
      </NavLink>
      <NavLink exact to="/listings">
        Listings
      </NavLink>
      <NavLink exact to="/listings/new">
        New Listing
      </NavLink>
      {/*
        The empty tags <> </> are called react fragments. They allow
        you to essentially return multiple react elements at once.
       */}
      {currentUser ? (
        <>
          <span>👩‍💻 {currentUser.full_name}</span>
          <a href="#not-used" onClick={handleSignOutClick}>
            Sign Out
          </a>
        </>
      ) : (
        <NavLink exact to="/session/new">
          Sign In
        </NavLink>
      )}
    </nav>
  );
};

export default NavBar;
