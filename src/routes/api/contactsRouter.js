const express = require("express");
const router = express.Router();
const { authenticate } = require("../../middlewares/authenticateMiddleware");

const {
  getContactsController,
  getContactsByIdController,
  postContactController,
  changeContactController,
  deleteContactController,
  updateStatusContactController,
} = require("../../controllers/contactsController");

const {
  addContactValidation,
  patchContactValidation,
} = require("../../middlewares/validationMiddlewares");

const { asyncWrapper } = require("../../helpers/apiHelpers");

// router.use(authMiddleware);

router.get("/", authenticate, asyncWrapper(getContactsController));
router.get(
  "/:contactId",
  authenticate,
  asyncWrapper(getContactsByIdController)
);
router.post(
  "/",
  authenticate,
  addContactValidation,
  asyncWrapper(postContactController)
);
router.delete(
  "/:contactId",
  authenticate,
  asyncWrapper(deleteContactController)
);
router.put(
  "/:contactId",
  authenticate,
  addContactValidation,
  asyncWrapper(changeContactController)
);
router.patch(
  "/:contactId",
  authenticate,
  patchContactValidation,
  asyncWrapper(updateStatusContactController)
);

module.exports = { contactsRouter: router };
