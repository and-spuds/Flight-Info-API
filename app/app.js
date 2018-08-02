const express = require("express");
const jwtMiddleware = require("express-jwt");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const JWT_SECRET = process.env.JWT_SECRET;

// Create App
const app = express();

// For each request, parse request body into a JavaScript object
app.use(bodyParser.json());

// Logging
app.use(pino);

// Express routes
const router = express.Router();

router.all(
  "*",
  jwtMiddleware({
    secret: JWT_SECRET,
    getToken: function(req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        // Handle token presented as a Bearer token in the Authorization header
        return req.headers.authorization.split(" ")[1];
      }

      return null;
    }
  })
);

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the Flight API!" });
});

router.get("/health", require("./routes/health"));
router.get("/api/:name", require("./routes/api"));

router.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", router);

// Error handling
app.use((req, res) => {
  res.status(404).json({ code: 404, message: "Not Found" });
});

module.exports = app;
