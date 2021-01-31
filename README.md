# nuxt-prometheus-module

> Use this module to expose metrics to another port (you need to use nuxt start or nuxt dev).

> This repo was forked from https://gitlab.com/qonfucius/nuxt-prometheus-module.


## Setup

1. Add the `nuxt-prometheus-module` dependency with `yarn` or `npm` to your project
2. Add `nuxt-prometheus-module` to the `modules` section of `nuxt.config.js`
3. Configure it:

```js
{
  modules: [
    // Simple usage
    'nuxt-prometheus-module',

    // With options
    ['nuxt-maps-module', { /* module options */ }]
  ]
}
```
## Options

### path
Default: `/metrics`

Path where metrics will be available
### `port`
Default: `9100`

Port where metrics will be available

### `host`
Default: `127.0.0.1`

Host to bind. Use `0.0.0.0` to be available everywhere, `127.0.0.1` mean "only available on the current host"

### `metrics`

Enable/Disable some metrics

#### `collectDefault`
Default: `true`

Send default metrics about nodejs itself. Pass object to send options to `Prometheus.collectDefaultMetrics`.

#### `requestDuration`
Default: `true`

Send request duration tile with routes.


## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)
