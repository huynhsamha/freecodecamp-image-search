import express from 'express';
import validator from 'validator';
import mongoose from 'mongoose';
import config from '../../config';

const router = express.Router();

const Url = mongoose.model('Url');

router.get('/', (req, res, next) => {
  res.send('Hello freeCodeCamp challenge!');
});

/** handle short url and redirect */
router.get('/:url', (req, res, next) => {
  const { url } = req.params;
  Url.findOne({ short_url: url }).then((url) => {
    if (!url) return res.send({ error: 'Url is not found on database' });
    res.redirect(url.original_url);
  }).catch(err => res.send(err));
});

const mapShortenUrl = {};
const generateShortenUrl = () => {
  for (;;) {
    const res = Math.floor(100000 + Math.random() * 999999);
    if (!mapShortenUrl[res]) { mapShortenUrl[res] = 1; return res; }
  }
};

/** handle shortening origin url and response */
router.get('/new/:url*', (req, res, next) => {
  const original_url = req.url.slice(5); // slice '/new/' to get url
  if (!validator.isURL(original_url)) {
    return res.send({ error: 'Url is not valid, please try again with valid url after /new/' });
  }
  Url.findOne({ original_url }).then((url) => {
    if (url) return url;
    const short_url = generateShortenUrl();
    return Url.create({ original_url, short_url });
  })
    .then((url) => {
      const { original_url, short_url } = url;
      return res.send({ original_url, short_url: `${config.domain}/${short_url}` });
    })
    .catch(err => res.send(err));
});

/** handle other routes */
router.get('*', (req, res, next) => {
  res.send({ error: 'To create shorten url, should format /new/[valid url]' });
});

export default router;
