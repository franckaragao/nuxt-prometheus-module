const http = require("http");
const Prometheus = require("prom-client");
const defaults = require("./defaults");

function requestDuration() {
  return new Prometheus.Histogram({
    name: "http_request_duration_ms",
    help: "Duration of HTTP requests in ms",
    labelNames: ["method", "route", "code"],
    buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500]
  });
}

function defaultMetrics(collectDefault) {
  const metricsInterval = Prometheus.collectDefaultMetrics(
    typeof collectDefault === "object" ? collectDefault : {}
  );
  process.on("SIGTERM", () => {
    clearInterval(metricsInterval);
  });
}

module.exports = function PrometheusModule(moduleOptions) {
  const options = {
    ...defaults,
    ...this.options["nuxt-phometheus-module"],
    ...moduleOptions
  };
  const { metrics, path, host, port } = options;
  if (metrics && metrics.collectDefault) {
    defaultMetrics(metrics.collectDefault);
  }

  if (metrics && metrics.requestDuration) {
    const httpRequestDurationMicroseconds = requestDuration();
    this.addServerMiddleware((req, res, next) => {
      const startEpoch = Date.now();
      res.once("finish", () => {
        const responseTimeInMs = Date.now() - startEpoch;
        httpRequestDurationMicroseconds
          .labels(req.method, req.originalUrl, res.statusCode)
          .observe(responseTimeInMs);
      });
      next();
    });
  }
  this.nuxt.hook("listen", () => {
    http
      .createServer((req, res) => {
        if (req.url === path) {
          res.writeHead(200, {
            "Content-Type": Prometheus.register.contentType
          });
          res.end(Prometheus.register.metrics());
        } else {
          res.writeHead(404, {
            "Content-Type": "text/html"
          });
          res.end("Metrics available in <code>/metrics</code>");
        }
      })
      .listen(port, host);
  });
};
