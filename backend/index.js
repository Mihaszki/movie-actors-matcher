const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const peopleRoute = require('./routers/people');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/people', peopleRoute);

app.listen(port, () => {
  console.log(`Listening at port: ${port}`);
});
