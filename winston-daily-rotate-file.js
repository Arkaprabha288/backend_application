const fs = require('fs');
const logDirectory = 'logs';

// Create the log directory if it does not exist
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
