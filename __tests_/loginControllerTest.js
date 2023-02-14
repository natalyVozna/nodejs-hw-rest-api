// const { loginController } = require("../src/controllers/usersController");
// const RequestError = require("../src/helpers/RequestError");
// const { User } = require("../src/models/userModel");
// const { login } = require("../src/services/userService");
// const jwt = require("jsonwebtoken");

// describe("Login Controller test", () => {
//   it("should return status code 200", async () => {
//     const mReq = {
//       body: {
//         email: "test9@mail.com",
//         password: "1234555",
//       },
//     };

//     const user = {
//       _id: "1",
//       email: "test9@mail.com",
//       password: "1234555",
//       avatarURL: "qwe.jpg",
//       token: "123qwe",
//       subscription: "starter",
//     };

//     jest.spyOn(User, "findOne").mockImplementationOnce(async () => user);

//     const findUser = await login(mReq.body.email, mReq.body.password);

//     const token = jwt.sign(
//       {
//         id: findUser._id,
//         subscription: findUser.subscription,
//       },
//       process.env.JWT_SECRET
//     );

//     const newUser = {
//       _id: "1",
//       email: "test9@mail.com",
//       password: "1234555",
//       avatarURL: "qwe.jpg",
//       token: findUser.token,
//       subscription: "starter",
//     };

//     const mRes = {
//       token: findUser.token,
//       user: {
//         email: findUser.user.email,
//         subscription: findUser.user.subscription,
//       },
//       statusCode: 200,
//     };
//     jest
//       .spyOn(User, "findByIdAndUpdate")
//       .mockImplementationOnce(async () => newUser);

//     // const result = await login(mReq.body.email, mReq.body.password);
//     const result = await loginController(mReq, mRes);

//     expect(mRes.token).toEqual(token);
//     expect(mRes.user.email).toEqual(user.email);
//     expect(mRes.user.subscription).toEqual(user.subscription);
//   });
// });
