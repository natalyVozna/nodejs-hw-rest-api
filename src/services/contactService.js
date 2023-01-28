const { Contact } = require("../db/contactModel");
const {
  WrongParametersError,
  NotAuthorizedError,
} = require("../helpers/errors");
const RequestError = require("../helpers/RequestError");

const getContacts = async (userId) => {
  const contacts = await Contact.find({ userId });
  return contacts;
};

const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, userId });
  if (!contact) {
    throw RequestError(404, "Not Found");
  }

  return contact;
};

const addContact = async (body, userId) => {
  const contact = new Contact({ ...body, userId });
  await contact.save();

  return contact;
};

const changeContactById = async (contactId, body, userId) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    { $set: body }
  );
  if (!contact) {
    throw RequestError(404, "Not Found");
    // throw new WrongParametersError("Not found");
  }

  return contact;
};

const patchContactById = async (contactId, favorite, userId) => {
  const contact = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    { $set: { favorite } }
  );
  if (!contact) {
    throw RequestError(404, "Not Found");
  }

  return contact;
};

const deletContactById = async (contactId, userId) => {
  await Contact.findOneAndRemove({ _id: contactId, userId });
};

module.exports = {
  getContactById,
  getContacts,
  addContact,
  changeContactById,
  patchContactById,
  deletContactById,
};
