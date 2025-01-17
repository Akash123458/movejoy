const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51OhlclSGBHW2aeqCQwHgpwj4lQnYeeKc215rFF4L5kYMbGNEJly1HBHizeqbMe1RlaO9qCcCTOYc3xlG9rVu3OdQ0068Z612Wx"
); // Replace with your Stripe secret key
const Ticket = require("./models/Ticket");
const connectDB = require("./config/db");
const Movies = require("./models/Movies");
const Showtimes = require("./models/Showtimes");

const app = express();
connectDB();
app.use(express.json());
app.use(cors()); // Enable CORS

const userRoutes = require("./routes/users");

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send({
    data: "Hello World",
  });
});

app.get("/api/movies", async (req, res) => {
  try {
    const movies = await Movies.find(); // Fetch all movies
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/ticket", async (req, res) => {
  try {
    const { userId } = req.body;
    const tickets = await Ticket.find({ user: userId })
      .populate("movie_id")
      .populate("user")
      .populate("seats")
      .populate("time")
      .populate("location")
      .populate("cinema")
      .populate("date")
      .populate("day")
      .populate("price");
    res.json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
});

app.get("/api/movies", async (req, res) => {
  try {
    const movies = await Movies.find(); // Fetch all movies
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get("/api/showtimes", async (req, res) => {
  try {
    const showtimes = await Showtimes.find(); // Fetch all showtimes
    console.log("running");
    res.json(showtimes);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error("Error creating ticket:", error);
  }
});

app.post("/api/book-ticket", async (req, res) => {
  const {
    movie_id,
    user,
    seats,
    cinema,
    location,
    time,
    sessionId,
    date,
    price,
    day,
  } = req.body;
  console.log("runnning - ticket book");
  try {
    const ticket = new Ticket({
      movie_id: movie_id,
      user: user,
      seats: seats,
      cinema: cinema,
      location: location,
      time: time,
      date: date,
      day: day,
      price: price,
      session_id: sessionId,
    });

    console.log(ticket);

    const tickets = await Ticket.find({ session_id: sessionId }).populate(
      "session_id"
    );

    if (tickets.length > 0) {
      res.send("Ticket already");
    } else {
      await ticket.save();
      res.send("Ticket created successfully:");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/retrieve-checkout-session/:sessionId", async (req, res) => {
  const sessionId = req.params.sessionId;
  console.log(req.body);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    // console.log(session);
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;
    console.log(amount);
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            unit_amount: `${amount}00`,
            product_data: {
              name: "Movejoy",
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://127.0.0.1:5505/ticket.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://127.0.0.1:5505/seat.html`,
    });

    res.send({
      data: session,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
