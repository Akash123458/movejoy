document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get("session_id");
  const BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://movejoy.onrender.com";
  // Function to generate a booking ID
  function generateBookingID() {
    const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ123456789";
    let result = "";
    for (let i = 0; i < 7; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }
  // Check if session already exists, otherwise, generate and save new session data
  if (sessionId) {
    await fetch(`${BASE_URL}/retrieve-checkout-session/${sessionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((session) => {
        if (session.payment_status === "paid") {
          fetch(`${BASE_URL}/api/book-ticket`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              movie_id: localStorage.getItem("movie_id"),
              user: localStorage.getItem("user"),
              seats: localStorage.getItem("seats"),
              cinema: sessionStorage.getItem("selectedCinema"),
              location: sessionStorage.getItem("selectedLocation"),
              time: sessionStorage.getItem("selectedShowTime"),
              date: sessionStorage.getItem("date"),
              day: sessionStorage.getItem("day"),
              price: localStorage.getItem("price"),
              sessionId: sessionId,
            }),
          })
            .then((response) => response.json())
            .then((res) => {
              console.log(res);
            });
          const url = new URL(window.location.href);
          url.search = "";
          window.history.pushState({}, document.title, url.toString());
          window.location.reload(true);
        }
      });
  } else {
    fetch(`${BASE_URL}/api/ticket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("user"),
      }),
    })
      .then((response) => response.json())
      .then((ticketData) => {
        console.log("ticket", ticketData);
        const ticketsContainer = document.getElementById("tickets-container");
        ticketsContainer.classList.add("ticket-grid");
        ticketData.forEach((ticket, index) => {
          const movie = ticket.movie_id;
          const cinema = ticket.cinema;
          const location = ticket.location;
          const time = ticket.time;
          const date = ticket.date;
          const day = ticket.day;
          const seats = ticket.seats;
          const price = ticket.price;
          const ticketCard = document.createElement("div");
          ticketCard.classList.add("ticket");
          let bookingID = sessionStorage.getItem(`bookingId-${index}`);
          if (!bookingID) {
            bookingID = generateBookingID();
            sessionStorage.setItem(`bookingId-${index}`, bookingID);
          }
          // Ticket card inner HTML
          ticketCard.innerHTML = `
              <div class="card card-top">
                <img src="${
                  movie.poster
                }" alt="Movie Poster" class="movie-poster" />
                <div class="detail">
                  <h2>${movie.title}</h2>
                  <p>${movie.genre}</p>
                  <p>${day} , ${date} | ${time}</p>
                  <p>${cinema} : ${location}</p>
                </div>
              </div>
              <div class="median"></div>
              <div class="card card-bottom">
                <div class="seat">
                  <p>SCREEN1</p>
                  <p>Seat - ${seats.map((seat) => seat).join(", ")}</p>
                  <div id="qr-code-container-${index}">
                      <img id="qr-code-${index}" alt="QR Code" class="qr-code" />
                  </div>
                  <p>BOOKING ID: <span id="booking-id-${index}">${bookingID}</span></p>
                  <p class="amount">Ticket(s) price: ${price}</p>
                </div>
              </div>
            `;
          // Append the ticket card to the container
          ticketsContainer.appendChild(ticketCard);
          const qrCodeContainer = document.getElementById(`qr-code-${index}`);
          // Generate and store QR code
          let qrCode = sessionStorage.getItem(`qrCode-${index}`);
          if (!qrCode) {
            QRCode.toDataURL(bookingID, { width: 100 }, function (err, url) {
              if (err) {
                console.error("Error generating QR code:", err);
              } else {
                qrCodeContainer.src = url;
                sessionStorage.setItem(`qrCode-${index}`, url); // Store QR code URL in sessionStorage
              }
            });
          } else {
            qrCodeContainer.src = qrCode; // Use existing QR code from sessionStorage
          }
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
});
