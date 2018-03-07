import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product/product.model';
import { AbstractControlDirective } from '@angular/forms/src/directives/abstract_control_directive';
import { element } from 'protractor';
import { imageService } from '../../../services/image.service';

@Component({
	selector: 'app-product-edit',
	templateUrl: './product-edit.component.html',
	styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

	product: Product;
	id: string;
	editMode = false;
	productForm: FormGroup = new FormGroup({});
	productImages: string[] = [];

	constructor(private route: ActivatedRoute,
							private productService: ProductService,
							private router: Router,
							private imageService: imageService) {
	}

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			this.id = params['id'];
			this.editMode = params['id'] != null;
			this.initForm();
		});
	}

	private initForm() {
		let name = '';
		let category = '';
		let gender = '';
		let price = null;
		const sizes = new FormArray([]);
		const colors = new FormArray([]);
		const files = new FormArray([]);
		if (this.editMode) {
			this.productService.getProduct(this.id).then(product => {
				name = product.name;
				category = product.category;
				gender = product.gender;
				price = product.price;

				if (product['sizes'] != null) {
					for (const size of product.sizes) {
						sizes.push(
							new FormGroup({
								'name': new FormControl(size, Validators.required)
							})
						);
					}
				}
				if (product['imageUrl'] != null) {
					for (const file of product.imageUrl) {
						this.productImages.push(file)
					}
				}

				if (product['colors'] != null) {
					for (const color of product.colors) {
						colors.push(
							new FormGroup({
								'name': new FormControl(color, Validators.required)
							})
						);
					}
				}
			})
				.then(() => this.productForm = new FormGroup({
					'name': new FormControl(name, Validators.required),
					'category': new FormControl(category, Validators.required),
					'gender': new FormControl(gender, Validators.required),
					'price': new FormControl(price, Validators.required),
					'sizes': sizes,
					'imageUrl': files,
					'colors': colors
				}));
		}

		this.productForm = new FormGroup({
			'name': new FormControl(name, Validators.required),
			'category': new FormControl(category, Validators.required),
			'gender': new FormControl(gender, Validators.required),
			'price': new FormControl(price, Validators.required),
			'sizes': sizes,
			'imageUrl': files,
			'colors': colors
		});
	}

	onAddSize() {
		(<FormArray>this.productForm.get('sizes')).push(new FormGroup({
			'name': new FormControl(null, Validators.required),
		}));
	}

	onDeleteSize(index: number) {
		(<FormArray>this.productForm.get('sizes')).removeAt(index);
	}

	onAddColor() {
		(<FormArray>this.productForm.get('colors')).push(new FormGroup({
			'name': new FormControl(null, Validators.required)
		}));
	}

	onDeleteColor(index: number) {
		(<FormArray>this.productForm.get('colors')).removeAt(index);
	}

	onAddfile() {
		(<FormArray>this.productForm.get('imageUrl')).push(
			new FormControl(null, Validators.required),
		);
	}

	onDeletefile(index: number) {
		(<FormArray>this.productForm.get('imageUrl')).removeAt(index);
	}
	onDeleteUploadedfile(index: number) {
		this.productImages.splice(index,1)
	}
	onUploadFile(index,e) {
		let field = document.getElementById(index)['files'][0];
		e.target.className += " " + "disabled";
		let reader = new FileReader();
		if(field) {
			reader.onload = () => {
			let imgBase64 = reader.result.split(',')[1];
			this.imageService.post(imgBase64)
			.then((rec) => this.productImages.push(rec["data"]['link']))
			.then((rec)=> (<FormArray>this.productForm.get('imageUrl')).controls[index].setValue(this.productImages[this.productImages.length -1]))
			.catch((err) => console.error(err));
		  }
		  reader.readAsDataURL(field);
		}
	}

	onSubmit() {
		this.productForm.value['imageUrl'] = this.productImages;
		if (this.editMode) {
			this.productService.update(this.id, this.productForm.value);
		} else {
			this.productService.post(this.productForm.value);
		}
		this.onCancel();
	}

	onCancel() {
		this.router.navigate(['../'], {relativeTo: this.route});
	}
}
