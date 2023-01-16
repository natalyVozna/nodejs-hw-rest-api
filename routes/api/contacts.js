const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const {
  addContactValidation,
} = require("../../middlewares/validationMiddlewares");
const e = require("express");

router.get("/", async (req, res, next) => {
  try {
    const dataContacts = await listContacts();
    res.status(200).json(dataContacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (contact === undefined) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", addContactValidation, async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contacts = await removeContact(req.params.contactId);
    if (contacts === null) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", addContactValidation, async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "missing fields" });
    }
    const contact = await updateContact(req.params.contactId, req.body);
    if (contact === null) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
