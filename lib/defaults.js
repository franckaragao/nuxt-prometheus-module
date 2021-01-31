const defaults = {
  path: "/metrics",
  host: "127.0.0.1",
  port: 9100,
  metrics: {
    collectDefault: true,
    requestDuration: true
  }
};

module.exports = defaults;
