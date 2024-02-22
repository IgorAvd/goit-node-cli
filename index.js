import { program } from "commander";
import * as contactsService from "./contacts.js";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();
console.log("contactsService", contactsService);
// TODO: рефакторити
const invokeAction = async ({ action, id, ...data }) => {
  switch (action) {
    case "list":
      const allContacts = await contactsService.listContacts();
      return console.table(allContacts);

    case "get":
      const oneContact = await contactsService.getContactById(id);
      return console.table(oneContact);

    case "add":
      const newContact = await contactsService.addContact(data);
      return console.table(newContact);

    case "remove":
      const removedContact = await contactsService.removeContact(id);
      return console.table(removedContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(options);
