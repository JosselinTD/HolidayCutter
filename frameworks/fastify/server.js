const server = require("./fastify")();

const port = process.env.HTTP_SERVER_PORT || 3000;

server.listen({ port }, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log("HTTP server started on port " + port);
});
