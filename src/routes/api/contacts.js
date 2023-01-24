const express = require("express");
const router = express.Router();
// const { asyncWrapper } = require("../../helpers/apiHelpers");

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

// router.get("/", asyncWrapper(getContactsController));
// router.get("/:contactId", asyncWrapper(getContactsByIdController));
// router.post("/", addContactValidation, asyncWrapper(postContactController));
// router.delete("/:contactId", asyncWrapper(deleteContactController));
// router.put(
//   "/:contactId",
//   addContactValidation,
//   asyncWrapper(changeContactController)
// );
// router.patch(
//   "/:contactId",
//   patchContactValidation,
//   asyncWrapper(updateStatusContactController)
// );

router.get("/", getContactsController);
router.get("/:contactId", getContactsByIdController);
router.post("/", addContactValidation, postContactController);
router.delete("/:contactId", deleteContactController);
router.put("/:contactId", addContactValidation, changeContactController);
router.patch(
  "/:contactId",
  patchContactValidation,
  updateStatusContactController
);

module.exports = router;
