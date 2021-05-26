const express = require('express');
const got = require('got');
const router = express.Router();
require('dotenv').config();

router.post('/', async (req, res) => {
  try {
    const { body } = await got(`https://api.themoviedb.org/3/search/person?api_key=${process.env.API_KEY}&language=en-US&page=1&include_adult=false&query=${encodeURIComponent(req.body.query)}`, {
      responseType: 'json',
    });

    res.status(200).json(body);
  }
  catch (err) {
    res.status(400).json({ err });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { body } = await got(`https://api.themoviedb.org/3/person/${req.params.id}/movie_credits?api_key=${process.env.API_KEY}&language=en-US`, {
      responseType: 'json',
    });

    res.status(200).json(body);
  }
  catch (err) {
    res.status(400).json({ err });
  }
});

router.get('/movies/:ids', async (req, res) => {
  try {
    const { body } = await got(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=vote_average.desc&with_people=${req.params.ids}`, {
      responseType: 'json',
    });

    res.status(200).json(body);
  }
  catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = router;