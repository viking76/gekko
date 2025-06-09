// Note: this file gets copied around, make sure you edit
// the UIconfig located at `gekko/web/vue/dist/UIconfig.js`.

// This config is used by both the frontend as well as the web server.
// see https://gekko.wizb.it/docs/installation/installing_gekko_on_a_server.html#Configuring-Gekko

let CONFIG;

if(typeof window === 'undefined') {
  // Server-side config
  CONFIG = {
    headless: true,
    api: {
      host: '0.0.0.0',
      port: 12000,
      timeout: 360000 // 6 minutes
    },
    ui: {
      ssl: false,
      host: '0.0.0.0',
      port: 12000,
      path: '/'
    },
    adapter: 'sqlite'
  };
  module.exports = CONFIG;
} else {
  // Client-side config
  CONFIG = {
    headless: true,
    api: {
      host: window.location.hostname,
      port: window.location.port || 12000,
      timeout: 360000 // 6 minutes
    },
    ui: {
      ssl: window.location.protocol === 'https:',
      host: window.location.hostname,
      port: window.location.port || 12000,
      path: '/'
    },
    adapter: 'sqlite'
  };
  window.CONFIG = CONFIG;
}
