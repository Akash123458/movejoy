class SpecialHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = ` 
        <style>
        nav {
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  background-color: black;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  position: sticky;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 65px; 
}
nav ul {
  width: 100%;
  list-style: none;
  display: flex;
}
nav a {
  display: flex;
  height: 100%;
  padding: 0 30px;
  text-decoration: none;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  width: 50px;
  height: 50px;
}

.logo h1 {
  color: white;
  margin-left: 10px;
  margin-right: 15px;
}
.nav-list {
  width: 90%;
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  list-style: none;
  justify-content: space-between;
}
.nav-list li {
  align-items: center;
  font-size: 16px;
  margin-left: 5px;
  height: 30px;
  width: 100%;
  text-decoration: none;
  color: black;
}
.nav-list a{
  font-weight: 400;
  padding: 0.8rem 1.5rem;
  color: white;
}
.nav-item {
  display: flex;
  align-items: center;
}

.nav-item li a {
  display: flex;
  align-items: center; 
  text-decoration: none;
  color: white;
  padding: 0.8rem 1.5rem;
  font-weight: 400;
  font-size: 16px;
}
.nav-item li a i {
  margin-right: 12px; 
  font-size: 1.4rem; 
  color: white;
}

nav .log{
  padding: 12px 28px;
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-weight: 100;
  border-radius: 0.8rem;
}

.login-item #log {
  display: flex;
  width: auto;
  white-space: nowrap;
  color: white;
}
.nav-item #log:hover{
  background: #5c6ac4 ;
  transition: background-color 0.3s, color 0.3s;
}

.login-item a{
  justify-content: center;
}

.dropdown-button{
  align-items: center; 
  text-decoration: none;
  font-weight: 600;
  font-size: 8px;
  border-radius: 10px;
  cursor: pointer;
}

.nav-item li {
  height: 35px;
}
.nav-item li :hover {
  border-radius: 0.8rem;
  background-color: #454545;
  transition: background-color 0.3s, color 0.3s;
}

/* New Modal Styles */
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4); 
}

/* location popup */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 15px 20px;
  border: 1px solid #888;
  width: 35%;
  text-align: center;
  border-radius: 10px;
  font-size: 16px;
  transform: scale(0.8);
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
}

.modal-content h2{
  margin-bottom: 20px;
}

.modal-content ul {
  display: block;
}

.city-option {
  display: block; /* Each city on a new line */
  padding: 15px 20px; 
  margin-bottom: 10px; 
  cursor: pointer;
  border-radius: 5px;
  color: black;
  font-weight: 500;
  text-align: center; /* Center text */
}

.modal-content li {
  justify-content: center;
  height: 50px;
  list-style-type: none; 
  padding: 10px 0; 
  font-size: 18px;
}


.modal-content .city-option:hover {
  background: #f0f0f0;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

#locationModal {
  display: none; 
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
}

/* login dropdown */
.login-item {
  position: relative;
}

#dropdown-menu {
  display: none;
  position: absolute;
  height: 110px;
  top: 35px;
  left: 0;
  background-color: #E5E5E5;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow: hidden;
  z-index: 1000;
  width: 150px;
  padding: 10px 24px; 
  text-align: center; 
}

.login-item:hover #dropdown-menu {
  display: block;
}

.dropdown-button {
  width: 100%;
  border: none;
  font-size: 16px;
  color: black;
  cursor: pointer;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
}

/* Hover effect for buttons */
#dropdown-menu .dropdown-button:hover {
  background: #5c6ac4;
  color: white;
}

#dropdown-menu li:not(:last-child) {
  margin-bottom: 12px; 
} 
        

        </style>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="script.js"></script>
    <link rel="shortcut icon" href="logo.png" type="image/x-icon" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <title>Movies Website</title>
  </head>
  <body>
          <nav class="navbar">
      <ul class="nav-list">
        <div class="logo">
          <img src="logo.png" alt="logo" />
          <h1 class="heading">Movejoy</h1>
        </div>
        <div class="nav-item">
          <li><a href="index.html">Home</a></li>
          <li><a id="movie" href="#movies">Movies</a></li>
          <li>
            <a id="location" href="#"
              ><i class="fa-solid fa-location-dot"></i> Thane</a
            >
          </li>
          <li class="login-item">
            <a href="login.html" id="log">Login</a>
            <ul id="dropdown-menu">
              <li>
                <button onclick="handleLogOut()" class="dropdown-button"  id="logout">Log Out</button>
              </li>
              <li>
                <button onclick="handleTicket()" class="dropdown-button" id="Ticket">Ticket</button>
              </li>
            </ul>
          </li>
        </div>
      </ul>
    </nav>
    </body>
</html>`;
  }
}
class SpecialFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <style>
        .footer {
  bottom: 0px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  height: 250px;
  display: flex;
  justify-content: space-between;
  background-color: #000000;
}

.social {
  margin-right: 120px;
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
}

.social .fa-brands {
  background-color: #ffffff;
  padding: 8px;
  margin-right: 12px;
  font-size: 2rem;
  border-radius: 50%;
  border: 4px solid #141414;
  color: #5a5d9d;
}

.social .fa-brands:hover {
  background: #5a5d9d;
  color: #ffffff;
  transition: 0.2s all linear;
}

.about-link {
  position: relative;
  top: 20px;
  margin-left: 15px;
  text-decoration: none;
  font-size: 1.2rem;
  color: white;
}

.about-link:hover {
  color: #9095ff;
  cursor: pointer;
  transition: 0.3s ease;
}

.logo-foot img {
  margin-top: 20px;
  margin-left: 100px;
  width: 80px;
  height: 80px;
  margin-bottom: 0px;
}

.logo-foot {
  display: flex;
  color: white;
  align-items: center;
}

.logo-foot h1 {
  font-family: inter;
  font-size: xx-large;
  margin-left: 15px;
}

.logo-foot h3 {
  font-size: 20px;
  font-family: cursive;
  margin-top: 8px;
  margin-left: 15px;
  font-weight: 500;
}

.copyright p {
  margin-top: 215px;
  margin-right: 100px;
  justify-content: center;
  color: white;
}
        </style>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="script.js"></script>
    <link rel="shortcut icon" href="logo.png" type="image/x-icon" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <title>Movies Website</title>
  </head>
  <body>
        <section class="footer">
        <div class="logo-foot">
          <img src="logo.png" alt="logo" />
          <div class="text-container">
            <h1 class="heading1">MoveJoy</h1>
            <h3>Discover a new way to enjoy movies!</h3>
            <a href="about.html" class="about-link">About Us</a>
          </div>
        </div>
        <div class="copyright">
          <p>&#169; MoveJoy All Right Reserved</p>
        </div>
        <div class="social">
          <a href="#"><i class="fa-brands fa-facebook"></i></a>
          <a href="#"><i class="fa-brands fa-x-twitter"></i></a>
          <a href="#"><i class="fa-brands fa-instagram"></i></a>
        </div>
      </section>
      </body>
</html>
        `;
  }
}
customElements.define("special-header", SpecialHeader);
customElements.define("special-footer", SpecialFooter);
