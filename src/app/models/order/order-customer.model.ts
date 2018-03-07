export class OrderCustomer {
	user: any;
	email: string;
	firstName: string;
	lastName: string;
	address: string;
	city: string;
	province: string;
	postalCode: string;
	country: string;

	constructor( user: any,
							email: string,
							firstName: string,
							lastName: string,
							address: string,
							city: string,
							province: string,
							postalCode: string,
							country: string ) {
		this.user = user;
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.address = address;
		this.city = city;
		this.province = province;
		this.postalCode = postalCode;
		this.country = country;
	}
}
