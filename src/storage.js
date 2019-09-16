const { Writable } = require('stream');

const defaultProps = {
  bps: 1024,
}

class DevNullWritable extends Writable {
  constructor(props) {
    super(props);
    if (Number.isInteger(props && props.bps)) {
      this.bps = props.bps;
    }
  }

  _write(chunk, encoding, cb) {
    if (!(chunk instanceof Buffer)) {
      chunk = Buffer.from(chunk);
    }

    const chunkSize = chunk.length;
    chunk = null;

    if (this.bps) {
      setTimeout(cb, chunkSize / this.bps * 1000);
    } else {
      cb();
    }
  }
}

module.exports = class MockStorage {
  constructor(props) {
    Object.assign(this, defaultProps, props);
  }

  _handleFile(req, file, cb) {
    const writableStream = new DevNullWritable({ bps: this.bps });
    file.stream.pipe(writableStream);
    writableStream.on('finish', cb);
  }

  _removeFile(req, file, cb) {
    cb();
  }
}
