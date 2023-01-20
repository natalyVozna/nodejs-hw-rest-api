const express = require("express");
const router = express.Router();

const {
  getContacts,
  getContactsById,
  postContact,
  changeContact,
  deleteContact,
  updateStatusContact,
} = require("../../controllers/contactsController");

const {
  addContactValidation,
  patchContactValidation,
} = require("../../middlewares/validationMiddlewares");
const { asyncWrapper } = require("../../helpers/apiHelpers");

router.get("/", getContacts);
router.get("/:contactId", getContactsById);
router.post("/", addContactValidation, postContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", addContactValidation, changeContact);
router.patch("/:contactId", patchContactValidation, updateStatusContact);

module.exports = router;
