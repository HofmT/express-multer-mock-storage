# express-multer-mock-storage

This storage reads data from request and discards it right away. You can limit the BPS (bytes per second) to slow down the uploading progress to improve your ajax debugging.

## Usage

> yarn add -D multer express-multer-mock-storage

```javascript
const express = require('express');
const multer = require('multer');
const Storage = require('express-multer-mock-storage');

const storage = new Storage({ bps: 1024 });
const upload = multer({ storage });
const app = express();

app
  .post(
    '/upload',
    upload.single('file'),
    (req, res) => res.json({ success: true }),
  )
  .listen(8080);
```

### Options

| name  | type  | default  | description  |
|-------|-------|----------|--------------|
| bps   | number| 1024     | bytes per second |
