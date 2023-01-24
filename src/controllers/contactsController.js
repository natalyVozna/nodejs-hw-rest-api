const { Contact } = require("../db/contactModel");
const {
  getContactById,
  getContacts,
  addContact,
  changeContactById,
  deletContactById,
} = require("../services/contactService");

const getContactsController = async (req, res, next) => {
  try {
    // const contacts = await Contact.find({});
    const contacts = await getContacts();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getContactsByIdController = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await getContactById(id);
    // const contact = await Contact.findById(id);
    // if (!contact) {
    //   res.status(404).json({ message: "Not found" });
    // }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postContactController = async (req, res, next) => {
  try {
    const contact = addContact(req.body);
    // const contact = new Contact(req.body);
    // await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const changeContactController = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await changeContactById(id, req.body);
    // const contact = await Contact.findByIdAndUpdate(id, { $set: req.body });
    // if (!contact) {
    //   return res.status(404).json({ message: "Not found" });
    // }
    res.status(200).json(contact);
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
};
const updateStatusContactController = async (req, res, next) => {
  const { favorite } = req.body;
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

const deleteContactController = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    await deletContactById(id);
    // await Contact.findByIdAndRemove(id);
    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  getContactsController,
  getContactsByIdController,
  changeContactController,
  postContactController,
  deleteContactController,
  updateStatusContactController,
};
