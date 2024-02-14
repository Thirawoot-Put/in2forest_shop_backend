const bcrypt = require('bcrypt');

exports.hash = input => bcrypt.hash(input, 12);
exports.compare = (text, hashValue) => bcrypt.compare(text, hashValue);