const { Contact } = require("../db/contactModel");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getContactsById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await Contact.findById(id);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postContact = async (req, res, next) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const changeContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await Contact.findByIdAndUpdate(id, { $set: req.body });
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
};
const updateStatusContact = async (req, res, next) => {
  const { favorite } = req.body;
  console.log("updateStatusConta", favorite);
  try {
    if (favorite === undefined) {
      res.status(400).json({ message: "Missing field favorite" });
    }
    const id = req.params.contactId;
    const contact = await Contact.findByIdAndUpdate(id, { $set: { favorite } });

    res.status(200).json(contact);
    // res.status(200).json({ message: "seccsses" });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    await Contact.findByIdAndRemove(id);
    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  getContacts,
  getContactsById,
  changeContact,
  postContact,
  deleteContact,
  updateStatusContact,
};
