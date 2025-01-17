// location
document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("locationModal");
  var locationLink = document.getElementById("location");
  var span = document.getElementsByClassName("close")[0];
  var cityOptions = document.getElementsByClassName("city-option");
  var defaultText = "Location";
  var savedCity = localStorage.getItem("selectedCity");
  if (!savedCity) {
    locationLink.textContent = defaultText;
  } else if (savedCity !== "null") {
    locationLink.innerHTML =
      '<i class="fa-solid fa-location-dot"></i>  ' + savedCity;
  }
  locationLink.addEventListener("click", function (event) {
    event.preventDefault();
    modal.style.display = "block";
  });
  span.addEventListener("click", function () {
    modal.style.display = "none";
  });
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
  for (var i = 0; i < cityOptions.length; i++) {
    cityOptions[i].addEventListener("click", function () {
      var selectedCity = this.textContent;
      locationLink.innerHTML =
        '<i class="fa-solid fa-location-dot"></i> ' + selectedCity;
      localStorage.setItem("selectedCity", selectedCity);
      modal.style.display = "none";
    });
  }
});

//fetching movies details
let movies = [];
let showtimesData = [];

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://movejoy.onrender.com";

Promise.all([
  fetch(`${BASE_URL}/api/movies`),
  fetch(`${BASE_URL}/api/showtimes`),
])
  .then((responses) =>
    Promise.all(responses.map((response) => response.json()))
  )
  .then((data) => {
    movies = data[0];
    showtimesData = data[1];
    console.log(data);
    Moviegrid();
    Moviedetail();
    populateDates();
    populateShowtimes();
  })
  .catch((error) => {
    console.error("Error fetching movie or showtime data:", error);
  });

// Function to populate the movie grid on the homepage
function Moviegrid() {
  const moviesContainer = document.querySelector(".movies-container");
  if (moviesContainer) {
    moviesContainer.innerHTML = "";
    movies.forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("box");
      movieElement.innerHTML = `
                <div class="box-img">
                    <a href="movie_pg1.html#${movie.id}">
                        <img src="${movie.poster}" alt="${movie.title} Movie Poster" />
                    <h3 class="moviename">${movie.title}</h3>
                    <span class="duration">${movie.duration}</span>
                    <span class="genre">${movie.genre}</span>
                </div></a>`;
      moviesContainer.appendChild(movieElement);
    });
  }
}

// Function to populate the movie detail page
function Moviedetail() {
  const movieContainer = document.querySelector(".movie_page");

  if (movieContainer) {
    const movieId = window.location.hash.substring(1);
    const movie = movies.find((m) => m.id === movieId);
    if (movie) {
      document.querySelector(".movie-poster").src = movie.poster;
      document.querySelector(".movie-title").textContent = movie.title;
      document.querySelector(
        ".movie-details"
      ).textContent = `${movie.duration} | ${movie.genre}`;
      document.querySelector(".trailer-link").href = movie.trailer;
      document.querySelector(".movie-description").textContent =
        movie.description;
    } else {
      console.log("Movie not found!");
    }
  }
}

// Function to populate date links
function populateDates() {
  const dateLinksContainer = document.querySelector(".date-links");
  const movieId = window.location.hash.substring(1);
  const movieShowtimes = showtimesData.find(
    (showtime) => showtime.movie_id === movieId
  );

  if (movieShowtimes) {
    movieShowtimes.dates.forEach((dateData, index) => {
      const dateElement = document.createElement("a");
      dateElement.href = "#";
      dateElement.classList.add("date-item");
      if (index === 0) {
        dateElement.classList.add("selected");
      }
      dateElement.dataset.date = dateData.date;
      dateElement.innerHTML = `
      <div class="day-text">${dateData.day}</div>
        <div class="date-text">${dateData.date}</div>
      `;
      dateElement.addEventListener("click", (e) => {
        e.preventDefault();
        document
          .querySelectorAll(".date-item")
          .forEach((el) => el.classList.remove("selected"));
        dateElement.classList.add("selected");
        populateShowtimes();
      });
      dateLinksContainer.appendChild(dateElement);
    });
  }
}

// Function to populate showtimes based on selected date
function populateShowtimes() {
  const cinemaInfoContainer = document.querySelector(".cinema-info");
  cinemaInfoContainer.innerHTML = "";

  const movieId = window.location.hash.substring(1);
  const movie = movies.find((m) => m.id === movieId);
  const movieShowtimes = showtimesData.find(
    (showtime) => showtime.movie_id === movieId
  );
  if (movieShowtimes) {
    const selectedDate = getSelectedDate();
    const dateData = movieShowtimes.dates.find(
      (date) => date.date === selectedDate
    );
    if (dateData) {
      dateData.cinemas.forEach((cinema) => {
        const cinemaElement = document.createElement("div");
        cinemaElement.classList.add("cinema");
        cinemaElement.innerHTML = `
          <h4>${cinema.name}</h4>
          <p>${cinema.location}</p>
          <div class="showtimes">
            <p>${cinema.type}</p>
            ${cinema.times
              .map(
                (time) => `
                   <a href="seat.html" class="showtime-link" data-cinema-name="${cinema.name}" data-cinema-location="${cinema.location}" data-cinema-time="${time}" data-movie-title="${movie.title}" data-movie-genre="${movie.genre}" data-cinema-date="${dateData.date}" data-cinema-day="${dateData.day}" >                                                 
                    ${time}
                  </a>`
              )
              .join("")}
          </div>`;
        cinemaInfoContainer.appendChild(cinemaElement);
      });
    } else {
      cinemaInfoContainer.textContent =
        "No showtimes available for the selected date.";
    }
  } else {
    cinemaInfoContainer.textContent = "Showtimes not found for this movie.";
  }
}

// Helper function to get the selected date
function getSelectedDate() {
  const selectedDateElement = document.querySelector(".date-links .selected");
  return selectedDateElement ? selectedDateElement.dataset.date : "";
}

// Event Listener for Showtime Links
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("showtime-link")) {
    event.preventDefault();
    const movieId = window.location.hash.substring(1);
    const movie = movies.find((m) => m.id === movieId);
    localStorage.setItem("movie_id", movie._id);
    const movieShowtimes = showtimesData.find(
      (showtime) => showtime.movie_id === movieId
    );
    localStorage.setItem("showtime_id", movieShowtimes._id);
    console.log(movieShowtimes._id);
    const movieTitle = event.target.getAttribute("data-movie-title");
    const movieGenre = event.target.getAttribute("data-movie-genre");
    const time = event.target.getAttribute("data-cinema-time");
    const cinema = event.target.getAttribute("data-cinema-name");
    const location = event.target.getAttribute("data-cinema-location");
    const cinemaDate = event.target.getAttribute("data-cinema-date");
    const cinemaDay = event.target.getAttribute("data-cinema-day");
    console.log("sdggd", cinemaDay);
    sessionStorage.setItem("date", cinemaDate);
    sessionStorage.setItem("day", cinemaDay);
    sessionStorage.setItem("selectedMovieTitle", movieTitle);
    sessionStorage.setItem("selectedMovieGenre", movieGenre);
    sessionStorage.setItem("selectedShowTime", time);
    sessionStorage.setItem("selectedCinema", cinema);
    sessionStorage.setItem("selectedLocation", location);
    sessionStorage.setItem("selectedCinemaDate", cinemaDate);
    sessionStorage.setItem("referringPage", window.location.href);
    window.location.href = event.target.href;
  }
});

// Function to Display Movie Details on Seat Page
function seatDetails() {
  const navbar = document.querySelector(".seatnavbar");
  const movieTitle = sessionStorage.getItem("selectedMovieTitle");
  const movieGenre = sessionStorage.getItem("selectedMovieGenre");
  const referringPage = sessionStorage.getItem("referringPage");
  if (navbar && movieTitle && movieGenre && referringPage) {
    navbar.innerHTML = `
      <a class="back-button" href="${referringPage}">
        <i class="fa-solid fa-angle-left"></i>Back
      </a>
      <div class="movie-info">
        <span class="movie-name">${movieTitle}</span>
        <span class="movie-genre">${movieGenre}</span>
      </div>
    `;
  }
}
window.addEventListener("load", () => {
  Moviedetail();
  seatDetails();
  handleSeatSelection();
});

// Function to Handle Seat Selection
function handleSeatSelection() {
  const seats = document.querySelector(".seat");
  const rows = document.querySelectorAll(".row");
  const totalSeats = document.getElementById("total-seats");
  const totalPrice = document.getElementById("total-price");
  let selectedSeats = 0;
  let price = 0;
  let seatArray = [];
  rows.forEach((row) => {
    const seats = row.querySelectorAll(".seat");
    seats.forEach((seat, index) => {
      seat.textContent = index + 1;
      // Handle seat selection
      seat.addEventListener("click", () => {
        const seatPrice = parseInt(seat.dataset.price);
        const seatnum = seat.dataset.seatnum;
        if (seatArray.includes(seatnum)) {
          const newArr = seatArray.filter((item) => item !== seatnum);
          seatArray = newArr;
        } else {
          seatArray.push(seatnum);
        }
        localStorage.setItem("seats", seatArray);
        //console.log(`Price: ${price}, Seat Number: ${seatnum}`);
        if (seat.classList.contains("selected")) {
          selectedSeats--;
          price -= seatPrice;
          seat.classList.remove("selected");
        } else {
          selectedSeats++;
          price += seatPrice;
          seat.classList.add("selected");
        }
        totalSeats.textContent = selectedSeats;
        totalPrice.textContent = price;
        localStorage.setItem("price", price);
      });
    });
  });
}
