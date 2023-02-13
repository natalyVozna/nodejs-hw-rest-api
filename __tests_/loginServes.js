const RequestError = require("../src/helpers/RequestError");
const { User } = require("../src/models/userModel");
const { login } = require("../src/services/userService");
const jwt = require("jsonwebtoken");

describe("Login Serves test", () => {
  it("should return user data and token by provided email", async () => {
    const mEmail = "test9@mail.com";
    const mPassword = "1234555";

    const user = {
      _id: "1",
      email: mEmail,
      password: mPassword,
      avatarURL: "qwe.jpg",
      subscription: "starter",
    };

    jest.spyOn(User, "findOne").mockImplementationOnce(async () => user);

    // const token = jwt.sign(
    //   { id: user._id, subscription: user.subscription },
    //   process.env.JWT_SECRET
    // );

    const result = await login(mEmail, mPassword);

    console.log("res", result);
    // expect(result.token).toEqual(token);
    expect(result.user.email).toEqual(mEmail);
  });
});
