const fs = require("fs/promises");
const path = require("path");
const { uid } = require("uid");
// const Joi = require("joi");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contact) =>
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));

const listContacts = async () => {
  const list = await fs.readFile(contactsPath);
  return JSON.parse(list);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((el) => el.id === contactId.toString());
  return contact || null;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: uid(),
    ...body,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = await contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...body };
  await updateContacts(contacts);
  return contacts[index];
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = await contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
