import React from 'react';
export default function Footer() {
    return (<div className="main-footer">
    <div className="container">
      <div className="row">
        {/* Column1 */}
        <div className="col">
          <h4>How to find us</h4>
          <p className="list-footer">
            <li>+45 91426969</li>
            <li>København, Danrmark</li>
            <li>2400 Nordvest</li>
          </p>
        </div>
        {/* Column2 */}
        <div className="col">
          <h4>Facility</h4>
          <p className="list-footer">
            <li>Private Room</li>
            <li>Event Space</li>
            <li>Custom Room</li>
          </p>
        </div>
        {/* Column3 */}
        <div className="col">
          <h4>About</h4>
          <p className="list-footer">
            <li ><a href="#">Our story</a></li>
            <li><a href="#">Benefits</a></li>
            <li><a href="#">Team</a></li>
            </p>
        </div>
        <div className="col">
          <h4>Follow Us</h4>
          <p className="list-footer">
            <li><a href="#">Instagram </a></li>
           
            <li><a href="#">Twitter </a></li>
            <li><a href="#">Facebook </a></li>
            </p>
        </div>
      </div>
      <hr />
      <div className="row">
        <p className="col-sm">
          &copy;{new Date().getFullYear()} Meal sharing| All rights reserved |
          Terms Of Service | Privacy
        </p>
      </div>
    </div>
  </div>)
}