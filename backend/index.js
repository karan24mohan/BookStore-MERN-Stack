const express = require("express");
const bookRoutes = require("./routes/bookRoutes");
const cors = require("cors");

const PORT = require("./PORT");
require("./config");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
