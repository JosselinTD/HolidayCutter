const fastify = require("fastify");
const fastifyController = require("../../adapters/fastify/fastify");

function build(opts = {}) {
  const app = fastify(opts);

  app.post("/intersect-with", fastifyController.intersectWith);
  app.post("/cut-by-months", fastifyController.cutByMonths);

  return app;
}

module.exports = build;
