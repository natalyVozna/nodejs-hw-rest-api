const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailReqexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailReqexp,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// userSchema.pre("save", async function () {
//   if (this.isNew) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
// });

// userSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailReqexp).required(),
  password: Joi.string().min(6).required(),
});
const loginSchema = Joi.object({
  email: Joi.string().pattern(emailReqexp).required(),
  password: Joi.string().min(6).required(),
});
const patchSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  patchSubscriptionSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
