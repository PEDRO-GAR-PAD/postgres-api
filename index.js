require('dotenv').config();

const server = require('./server');

const PORT = process.env.PORT || 8XXX;

server.listen(PORT, () => console.log(`Server is a live at localhost:${PORT}`));
