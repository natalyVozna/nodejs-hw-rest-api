const { Contact } = require("../db/contactModel");
const {
  getContactById,
  getContacts,
  addContact,
  changeContactById,
  patchContactById,
  deletContactById,
} = require("../services/contactService");

const getContactsController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const contacts = await getContacts(userId);
  res.status(200).json(contacts);
};

const getContactsByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const contact = await getContactById(contactId, userId);
  res.status(200).json(contact);
};

const postContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const contact = await addContact(req.body, userId);
  res.status(201).json(contact);
};

const changeContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const contact = await changeContactById(contactId, req.body, userId);

  res.status(200).json(contact);
};

const updateStatusContactController = async (req, res) => {
  const { favorite } = req.body;
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  if (favorite === undefined) {
    res.status(400).json({ message: "Missing field favorite" });
  }
  const contact = await patchContactById(contactId, favorite, userId);

  res.status(200).json(contact);
};

const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  await deletContactById(contactId, userId);
  res.status(200).json({ message: "Contact deleted" });
};

module.exports = {
  getContactsController,
  getContactsByIdController,
  changeContactController,
  postContactController,
  deleteContactController,
  updateStatusContactController,
};
