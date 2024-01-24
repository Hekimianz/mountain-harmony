const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const passport = require("passport");
const session = require("express-session");

const productsRoutes = require("./routes/Products");
const userRoutes = require("./routes/Users");

const PORT = process.env.SERVER_PORT || 4000;

const corsOptions = {
  origin: "https://mountain-harmony.onrender.com",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  "access-control-allow-credentials": true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const initializePassport = require("./passport-config");
initializePassport(passport);

app.use(
  session({
    secret: "b9c558dee606c2f9d035cc853a9b88f143c230ab1fbd4bfe4c76996ce1352f03",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Move the logging middleware here
app.use((req, res, next) => {
  console.log("Request to", req.originalUrl);
  console.log("Session ID:", req.sessionID);
  console.log("Authentication status:", req.isAuthenticated());
  next();
});

app.use("/products", productsRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on localhost:${PORT}`);
});
