const express = require("express");
const router = express.Router();

const {
  registrationController,
  loginController,
} = require("../../controllers/usersController");

const { asyncWrapper } = require("../../helpers/apiHelpers");

// router.get("/current", getContacts);
// router.post("/register", asyncWrapper(registrationController));
router.post("/register", registrationController);
router.post("/login", loginController);
// router.post("/logout", getContactsById);

// module.exports = { userRouter: router };
module.exports = router;
