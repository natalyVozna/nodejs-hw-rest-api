const { Contact } = require("../models/contactModel");
const RequestError = require("../helpers/RequestError");

const getContacts = async (owner, page, limit, filterParam) => {
  const contacts = await Contact.find({ owner })
    .populate("owner", "email")
    .skip(page * limit)
    .limit(limit);

  return contacts;
};
const getFilteredContacts = async (owner, filterParam) => {
  const contacts = await Contact.find({
    owner,
    favorite: filterParam,
  }).populate("owner", "email");

  return contacts;
};

const getContactById = async (contactId, owner) => {
  const contact = await Contact.findOne({ _id: contactId, owner });
  if (!contact) {
    throw RequestError(404, "Not Found");
  }

  return contact;
};

const addContact = async (body, owner) => {
  const contact = Contact.create({ ...body, owner });

  return contact;
};

const changeContactById = async (contactId, body, owner) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { $set: body }
  );
  if (!contact) {
    throw RequestError(404, "Not Found");
  }

  return contact;
};

const patchContactById = async (contactId, favorite, owner) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { $set: { favorite } }
  );
  if (!contact) {
    throw RequestError(404, "Not Found");
  }

  return contact;
};

const deletContactById = async (contactId, owner) => {
  await Contact.findOneAndRemove({ _id: contactId, owner });
};

module.exports = {
  getContactById,
  getFilteredContacts,
  getContacts,
  addContact,
  changeContactById,
  patchContactById,
  deletContactById,
};
