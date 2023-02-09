// const { Contact } = require("../models/contactModel");
const {
  getContactById,
  getFilteredContacts,
  getContacts,
  addContact,
  changeContactById,
  patchContactById,
  deletContactById,
} = require("../services/contactService");

const getContactsController = async (req, res, next) => {
  const page = req.query?.page - 1 || 0;
  const contactsPerPage = req.query.limit || 3;
  const { _id: owner } = req.user;

  if (req.query.favorite) {
    const filterParam = req.query.favorite;
    const contacts = await getFilteredContacts(owner, filterParam);
    res.status(200).json(contacts);
  }

  const contacts = await getContacts(owner, page, contactsPerPage);
  res.status(200).json(contacts);
};

const getContactsByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const contact = await getContactById(contactId, owner);
  res.status(200).json(contact);
};

const postContactController = async (req, res) => {
  const { _id: owner } = req.user;
  const contact = await addContact(req.body, owner);
  res.status(201).json(contact);
};

const changeContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const contact = await changeContactById(contactId, req.body, owner);

  res.status(200).json(contact);
};

const updateStatusContactController = async (req, res) => {
  const { favorite } = req.body;
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  if (favorite === undefined) {
    res.status(400).json({ message: "Missing field favorite" });
  }
  const contact = await patchContactById(contactId, favorite, owner);

  res.status(200).json(contact);
};

const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  await deletContactById(contactId, owner);
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
