const build = require("./fastify");

describe("falsify framework", () => {
  const app = build();
  describe("POST /intersect-with", () => {
    test("should return a positive answer", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/intersect-with",
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
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toBe('{"intersectWith":true}');
    });
    test("should return a positive answer", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/intersect-with",
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
      });
      expect(response.statusCode).toBe(200);
      expect(response.body).toBe('{"intersectWith":false}');
    });
  });

  describe("POST /cut-by-months", () => {
    test("should return an array with multiple answers", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/cut-by-months",
        body: {
          startDate: "2022-01-15",
          endDate: "2022-02-10",
        },
      });
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body)).toStrictEqual([
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
      const response = await app.inject({
        method: "POST",
        url: "/cut-by-months",
        body: {
          startDate: "2022-01-15",
          endDate: "2022-01-20",
        },
      });
      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body)).toStrictEqual([
        {
          startDate: "2022-01-15",
          endDate: "2022-01-20",
        },
      ]);
    });
  });
});
