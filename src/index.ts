const apps = require('./app');
const port = apps.get('port');
apps.listen(port);