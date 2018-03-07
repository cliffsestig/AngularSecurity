export class Product {
	_id: string;
	name: string;
	category: string;
	gender: string;
	price: number;
	quantity: number;
	sizes: string[];
	colors: string[];
	imageUrl: string[];

	constructor(_id: string, name: string, category: string, gender: string, price: number, sizes: string[], colors: string[], imageUrl: string[], quantity: number) {
		this._id = _id;
		this.name = name;
		this.category = category;
		this.gender = gender;
		this.price = price;
		this.quantity = quantity;
		this.sizes = sizes;
		this.colors = colors;
		this.imageUrl = imageUrl;
	}
}
