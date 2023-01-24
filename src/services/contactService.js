const { Contact } = require("../db/contactModel");
// const { WrongParametersError } = require("../helpers/errors");

const getContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async (id) => {
  const contact = await Contact.findById(id);
  if (!contact) {
    // throw new WrongParametersError("Not found");
    return res.status(404).json({ message: "Not found" });
  }

  return contact;
};

const addContact = async (body) => {
  const contact = new Contact(body);
  await contact.save();

  return contact;
};

const changeContactById = async (id, body) => {
  const contact = await Contact.findByIdAndUpdate(id, { $set: body });
  if (!contact) {
    // throw new WrongParametersError("Not found");
    // throw new WrongParametersError("Not found");
    return res.status(404).json({ message: "Not found" });
  }

  return contact;
};

const deletContactById = async (id) => {
  await Contact.findByIdAndRemove(id);
};

module.exports = {
  getContactById,
  getContacts,
  addContact,
  changeContactById,
  deletContactById,
};
