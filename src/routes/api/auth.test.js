// const mongoose = require("mongoose");
// const request = require("supertest");

// mongoose.set("strictQuery", false);

// require("dotenv").config();

// const app = require("../../../app");
// const { User } = require("../../models/userModel");

// const { DB_TEST_HOST, PORT } = process.env;

// // const { loginController } = require("./usersController");

// describe("test auth routes", () => {
//   let server;
//   beforeAll(() => (server = app.listen(PORT)));
//   afterAll(() => server.close());

//   beforeEach((done) => {
//     mongoose.connect(DB_TEST_HOST).then(() => done());
//   });

//   afterEach((done) => {
//     mongoose.connection.db["db-contacts"](() => {
//       mongoose.connect.close(() => done());
//     });
//   });
//   test("test login route", async (done) => {
//     const newUser = {
//       email: "test9@mail.com",
//       password: "1234555",
//     };

//     const user = await User.create(newUser);

//     /*
//       1. Перевірити вірність отриманої відповіді
//       на AJAX запит документациї
//       2. Перевірити що в базу записався потрібний елемент
//       */

//     const loginUser = {
//       email: "test9@mail.com",
//       password: "1234555",
//     };

//     const response = await request(app)
//       .post("/api/users/login")
//       .send(loginUser);

//     expect(response.statusCode).toBe(200);
//     const { body } = response;
//     expect(body.token).toBeTruthy();
//     expect.stringContaining(body.email);
//     const { token } = await User.findById(user._id);
//     expect(body.token).toBe(token);
//     done();
//   });
// });
