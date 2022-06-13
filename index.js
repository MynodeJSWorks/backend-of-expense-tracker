const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const server = express();
const authenticator = require("./middlewares/authenticator");
const catchAllErrorHandler = require("./middlewares/catchAllErrorHandler");

const categoryRouter = require("./routers/categoryRouter");
const recordRouter = require("./routers/recordRouter");
const userRouter = require("./routers/userRouter");

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use("/categories", authenticator, categoryRouter);
server.use("/records", authenticator, recordRouter);
server.use("/users", userRouter);

server.get("/", (req, res) => {
    res
        .status(200)
        .send(
            `<a href="https://github.com/mustafaoezkan/expense-tracker-fe" target="_blank">App</a>`
        );
});
server.use(catchAllErrorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});