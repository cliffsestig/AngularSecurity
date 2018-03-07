export class User {
	_id: string;
	email: string;
	firstName: string;
	lastName: string;
	hashedPassword: string;
	address: string;
	city: string;
	province: string;
	postalCode: string;
	country: string;
	admin: boolean;

	constructor(_id: string, email: string, firstName: string, lastName: string) {
		this._id = _id;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
	}
}
