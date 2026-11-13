const request = require("supertest");
const app = require("../src/app");

describe("User API Tests", () => {

    test("Should return welcome message", async () => {
        const response = await request(app).get("/");

        expect(response.statusCode).toBe(200);
        expect(response.text).toContain("Welcome");
    });

    test("Should return all users", async () => {
        const response = await request(app).get("/api/users");

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("Should return user by ID", async () => {
        const response = await request(app).get("/api/users/1");

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe("Nagaraju");
    });

    test("Should return 404 for invalid user", async () => {
        const response = await request(app).get("/api/users/999");

        expect(response.statusCode).toBe(404);
    });

    test("Should create a new user", async () => {
        const response = await request(app)
            .post("/api/users")
            .send({
                name: "John",
                email: "john@example.com"
            });

        expect(response.statusCode).toBe(201);
    });

    test("Should validate user input", async () => {
        const response = await request(app)
            .post("/api/users")
            .send({
                name: "John"
            });

        expect(response.statusCode).toBe(400);
    });
});
