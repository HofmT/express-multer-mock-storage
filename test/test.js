const express = require('express'); // eslint-disable-line node/no-unpublished-require
const multer = require('multer');
const request = require('supertest'); // eslint-disable-line node/no-unpublished-require
const Storage = require('../src/storage');

test('sending file in 1024 bps', (cb) => {
  const storage = new Storage();
  const upload = multer({ storage });
  const app = express();
  app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ success: true })
  });

  const now = Date.now();

  request(app)
    .post('/upload')
    .attach('file', Buffer.alloc(1024), { filename: 'image.png' })
    .expect(200, (err, res) => {
      expect(res.text).toEqual('{"success":true}')
      const cost = Date.now() - now;
      expect(cost >= 1000 || cost < 2000).toBe(true);
      cb();
    })
})

test('sending file in 2048 bps', (cb) => {
  const storage = new Storage({ bps: 2048 });
  const upload = multer({ storage });
  const app = express();
  app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ success: true })
  });

  const now = Date.now();

  request(app)
    .post('/upload')
    .attach('file', Buffer.alloc(1024), { filename: 'image.png' })
    .expect(200, (err, res) => {
      expect(res.text).toEqual('{"success":true}')
      const cost = Date.now() - now;
      expect(cost >= 500 || cost < 1000).toBe(true);
      cb();
    })
})