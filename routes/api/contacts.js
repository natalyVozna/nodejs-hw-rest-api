const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");

const router = express.Router();

// const schema = Joi.object({
//   name: Joi.string().min(3).max(30).required(),
//   email: Joi.string()
//     .email({
//       minDomainSegments: 2,
//       tlds: { allow: ["com", "net"] },
//     }) /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
//     .required(),
//   phone: Joi.string().min(3).max(15).required(),
// });

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

router.post("/", async (req, res, next) => {
  try {
    // if (!req.body.email) {
    //   return res.status(400).json({ message: "missing required email field" });
    // }
    // if (!req.body.name) {
    //   return res.status(400).json({ message: "missing required name field" });
    // }
    // if (!req.body.phone) {
    //   return res.status(400).json({ message: "missing required phone field" });
    // }
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.string().min(5).max(15).required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }
    console.log(" validationResult", validationResult);

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

router.put("/:contactId", async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "missing fields" });
    }

    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.string()
        .min(5)
        .max(20)
        // .pattern(new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$"))
        .required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.details });
    }

    const contact = await updateContact(req.params.contactId, req.body);
    if (contact === null) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(404).json({ message: "Not found PUT" });
  }
});

module.exports = router;
