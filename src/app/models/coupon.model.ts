export class Coupon {
	_id: string;
	name: string;
	amount: number;
	expiration_date: Date;
	valid: boolean;

	constructor(_id: string, name: string, amount: number, expiration_date: Date, valid: boolean) {
		this._id = _id;
		this.name = name;
		this.amount = amount;
		this.expiration_date = expiration_date;
		this.valid = valid;
	}
}
