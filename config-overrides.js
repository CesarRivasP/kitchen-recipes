// Esto tiene la configuracion minima y necesaria para que funcione el service worker
const {defaultInjectConfig, rewireWorkboxInject} = require('react-app-rewire-workbox')
const path = require('path');

module.exports = function override(config, env) {
  if (env === "production") {
    console.log("Generating Service Worker")

    const workboxConfig = {
      ...defaultInjectConfig, //tiene que ver con el modulo de pre-caching
      swSrc: path.join(__dirname, 'src', 'service-worker.js')
    }
    config = rewireWorkboxInject(workboxConfig)(config, env)
  }

  return config;
}
