import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import config from '../../config';
import { google } from 'googleapis';

const router = express.Router();

const customsearch = google.customsearch('v1');
const History = mongoose.model('History');

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../views/home.html'));
});


router.get('/api/latest/imagesearch/', (req, res, next) => {
  let { limit } = req.query;
  limit = +limit || 0;
  limit = limit > 50 ? 50 : limit;
  limit = (limit > 0 && limit <= 50) ? limit : 10;
  History.find().limit(limit).sort({ when: -1 })
    .exec()
    .then(data => data.map(o => ({ term: o.term, when: o.when })))
    .then(data => res.send(data))
    .catch((err) => {
      console.log(err); res.send(err);
    });
});


router.get('/api/imagesearch/:term', (req, res, next) => {
  const { term } = req.params;
  let { offset, limit } = req.query;
  console.log(term, offset, limit);

  const history = new History({ term });
  history.save().then(() => {}).catch(err => console.log(err));

  offset = +offset || 0;
  offset = (offset > 0) ? offset : 1;
  limit = +limit || 0;
  limit = (limit > 0 && limit <= 10) ? limit : 10;

  console.log(offset, limit);

  customsearch.cse.list({
    auth: config.ggApiKey, cx: config.ggCX,
    q: term,
    start: offset,
    num: limit
  })
    .then(ret => ret.data)
    .then((data) => {
      res.send({
        api_info: {
          url: '/api/imagesearch/:term?offset&limit',
          query: {
            offset: 'Default: 0, If offset is existen then offset > 0',
            limit: 'Default: 10, Min: 1, Max: 10'
          }
        },
        queries: data.queries,
        searchInformation: data.searchInformation,
        items: data.items.map(d => ({
          title: d.title,
          link: d.link,
          snippet: d.snippet,
          thumbnail: (d.pagemap.cse_thumbnail || [{}])[0].src,
          image: (d.pagemap.cse_image || [{}])[0].src
        }))
      });
    })
    .catch((err) => {
      // console.log(err);
      res.send(err);
    });
});

export default router;
