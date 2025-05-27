// api/index.js
import app from '../server.js';

export default function handler(req, res) {
  app(req, res);
}
