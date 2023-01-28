const fastifyController = require("./fastify.js");

describe("fastify controller", () => {
  describe("intersect with", () => {
    test("should return a positive answer", async () => {
      expect(
        await fastifyController.intersectWith(
          {
            body: {
              period: {
                startDate: "2022-01-10",
                endDate: "2022-01-25",
              },
              holiday: {
                startDate: "2022-01-12",
                endDate: "2022-01-20",
              },
            },
          },
          {}
        )
      ).toStrictEqual({
        intersectWith: true,
      });
    });
    test("should return a negative answer", async () => {
      expect(
        await fastifyController.intersectWith(
          {
            body: {
              period: {
                startDate: "2022-01-10",
                endDate: "2022-01-25",
              },
              holiday: {
                startDate: "2022-02-12",
                endDate: "2022-02-20",
              },
            },
          },
          {}
        )
      ).toStrictEqual({
        intersectWith: false,
      });
    });
  });

  describe("cut by months", () => {
    test("should return an array with multiple answers", async () => {
      expect(
        await fastifyController.cutByMonths({
          body: {
            startDate: "2022-01-15",
            endDate: "2022-02-10",
          },
        })
      ).toStrictEqual([
        {
          startDate: "2022-01-15",
          endDate: "2022-02-01",
        },
        {
          startDate: "2022-02-01",
          endDate: "2022-02-10",
        },
      ]);
    });
    test("should return an array with one answers", async () => {
      expect(
        await fastifyController.cutByMonths({
          body: {
            startDate: "2022-01-15",
            endDate: "2022-01-20",
          },
        })
      ).toStrictEqual([
        {
          startDate: "2022-01-15",
          endDate: "2022-01-20",
        },
      ]);
    });
  });
});
