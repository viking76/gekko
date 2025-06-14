const config = require('./vue/dist/UIconfig');

const koa = require('koa');
const serve = require('koa-static');
const cors = require('koa-cors');
const _ = require('lodash');
const bodyParser = require('koa-bodyparser');
const convert = require('koa-convert');

const open = require('open');
const server = require('http').createServer();
const Router = require('koa-router');
const router = new Router();
const ws = require('ws');
const app = new koa();

const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ server: server });

const cache = require('./state/cache');

const nodeCommand = _.last((process.argv[1] || '').split('/'));
const isDevServer = nodeCommand === 'server' || nodeCommand === 'server.js';

wss.on('connection', ws => {
  ws.isAlive = true;
  ws.on('pong', () => {
    ws.isAlive = true;
  });
  ws.ping(_.noop);
  ws.on('error', e => {
    console.error(new Date, '[WS] connection error:', e);
  });
});


setInterval(() => {
  wss.clients.forEach(ws => {
    if(!ws.isAlive) {
      console.log(new Date, '[WS] stale websocket client, terminiating..');
      return ws.terminate();
    }

    ws.isAlive = false;
    ws.ping(_.noop);
  });
}, 10 * 1000);

// broadcast function
const broadcast = data => {
  if(_.isEmpty(data)) {
    return;
  }

  const payload = JSON.stringify(data);

  wss.clients.forEach(ws => {
    ws.send(payload, err => {
      if(err) {
        console.log(new Date, '[WS] unable to send data to client:', err);
      }
    });
  }
  );
}
cache.set('broadcast', broadcast);


const ListManager = require('./state/listManager');
const GekkoManager = require('./state/gekkoManager');

// initialize lists and dump into cache
cache.set('imports', new ListManager);
cache.set('gekkos', new GekkoManager);
cache.set('apiKeyManager', require('./apiKeyManager'));

// setup API routes

const WEBROOT = __dirname + '/';
const ROUTE = n => WEBROOT + 'routes/' + n;

// attach routes
const apiKeys = require(ROUTE('apiKeys'));
router.get('/api/info', convert(require(ROUTE('info'))));
router.get('/api/strategies', convert(require(ROUTE('strategies'))));
router.get('/api/configPart/:part', convert(require(ROUTE('configPart'))));
router.get('/api/apiKeys', convert(apiKeys.get));

const listWraper = require(ROUTE('list'));
router.get('/api/imports', convert(listWraper('imports')));
router.get('/api/gekkos', convert(listWraper('gekkos')));
router.get('/api/exchanges', convert(require(ROUTE('exchanges'))));

router.post('/api/addApiKey', convert(apiKeys.add));
router.post('/api/removeApiKey', convert(apiKeys.remove));
router.post('/api/scan', convert(require(ROUTE('scanDateRange'))));
router.post('/api/scansets', convert(require(ROUTE('scanDatasets'))));
router.post('/api/backtest', convert(require(ROUTE('backtest'))));
router.post('/api/import', convert(require(ROUTE('import'))));
router.post('/api/startGekko', convert(require(ROUTE('startGekko'))));
router.post('/api/stopGekko', convert(require(ROUTE('stopGekko'))));
router.post('/api/deleteGekko', convert(require(ROUTE('deleteGekko'))));
router.post('/api/getCandles', convert(require(ROUTE('getCandles'))));


// incoming WS:
wss.on('connection', ws => {
  console.log('[WS] New websocket connection');
  ws.on('message', _.noop);
});

app
  .use(cors())
  .use(serve(WEBROOT + 'vue/dist'))
  .use(bodyParser())
  .use(require('koa-logger')())
  .use(router.routes())
  .use(router.allowedMethods());

server.timeout = config.api.timeout || 120000;
server.on('request', app.callback());
server.listen(config.api.port, config.api.host, '::', () => {
  const host = `${config.ui.host}:${config.ui.port}${config.ui.path}`;

  if(config.ui.ssl) {
    var location = `https://${host}`;
  } else {
    var location = `http://${host}`;
  }

  console.log('Serving Gekko UI on ' + location +  '\n');


  // only open a browser when running `node gekko`
  // this prevents opening the browser during development
  if(!isDevServer && !config.headless) {
    open(location)
      .catch(err => {
        console.log('Something went wrong when trying to open your web browser. UI is running on ' + location + '.');
    });
  }
});
