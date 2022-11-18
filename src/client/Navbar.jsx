import React from 'react';
export default function Navbar() {
  return (
    <nav>
      <div className="title-logo">
        <img
          src="/public/image/meal-sharing-icon.jpg"
          className="logo"
          alt="meal-sharing"
        />
        <a href="/" className="site-title">
          Meal sharing
        </a>
      </div>
      <ul>
        <li className="active">
          <a href="/meals">menu</a>
        </li>
        <li className="active">
          <a href="/add-meal">add meal</a>
        </li>
        <li className="active">
          <a href="/meals/:id">reservation</a>
        </li>
        <li className="active">
          <a href="/about">about</a>
        </li>
      </ul>
    </nav>
  );
}
