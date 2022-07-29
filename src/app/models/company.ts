import { Contact } from "./contact";

export class Company {
    id: number;
    social_name: String;
    address: String;
    email: String;
    cnpj: String;
    contacts: Contact;
}
