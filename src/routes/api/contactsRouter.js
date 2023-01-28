const express = require("express");
const router = express.Router();

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
const { authMiddleware } = require("../../middlewares/authMiddlewares");

router.use(authMiddleware);

router.get("/", asyncWrapper(getContactsController));
router.get("/:contactId", asyncWrapper(getContactsByIdController));
router.post("/", addContactValidation, asyncWrapper(postContactController));
router.delete("/:contactId", asyncWrapper(deleteContactController));
router.put(
  "/:contactId",
  addContactValidation,
  asyncWrapper(changeContactController)
);
router.patch(
  "/:contactId",
  patchContactValidation,
  asyncWrapper(updateStatusContactController)
);

module.exports = { contactsRouter: router };
