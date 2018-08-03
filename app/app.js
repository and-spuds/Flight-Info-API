const express = require("express");
const cors = require("cors");
const jwtMiddleware = require("express-jwt");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const JWT_SECRET = process.env.JWT_SECRET;

// Create App
const app = express();

// Enable CORS
app.use(cors({ origin: "http://localhost:8080" }));

// For each request, parse request body into a JavaScript object
app.use(bodyParser.json());

// Logging
app.use(pino);

// Express routes
const router = express.Router();

router.get("/health", require("./routes/health"));
router.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* istanbul ignore next */
router.all(
  "/flights/*",
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

router.patch("/flights/:id", require("./routes/update"));

app.use("/", router);

// Error handling
app.use((req, res) => {
  res.status(404).json({ code: 404, message: "Not Found" });
});

module.exports = app;
