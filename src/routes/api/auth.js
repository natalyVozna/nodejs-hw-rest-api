const express = require("express");
const router = express.Router();
const { schemas } = require("../../models/userModel");

const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateUserController,
} = require("../../controllers/usersController");

const { asyncWrapper } = require("../../helpers/apiHelpers");
const { authenticate } = require("../../middlewares/authenticateMiddleware");
const { validateBody } = require("../../middlewares/validateBody");

// router.post("/register", asyncWrapper(registrationController));
router.post(
  "/register",
  validateBody(schemas.registerSchema),
  asyncWrapper(registrationController)
);
router.post(
  "/login",
  validateBody(schemas.loginSchema),
  asyncWrapper(loginController)
);
router.get("/current", authenticate, asyncWrapper(getCurrentUserController));
router.patch(
  "/",
  authenticate,
  validateBody(schemas.patchSubscriptionSchema),
  asyncWrapper(updateUserController)
);
router.get("/logout", authenticate, asyncWrapper(logoutController));

module.exports = { userRouter: router };
// module.exports = router;
