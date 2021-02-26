import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NetworkService } from 'src/app/services/network.service';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.css']
})
export class StockEditComponent implements OnInit {

  imagePreview: string | ArrayBuffer;
  file: File;
  @ViewChild('productForm', { static: true }) productForm: NgForm;
  constructor(
    private activatedRoute: ActivatedRoute,
    private networkService: NetworkService,
    private location: Location,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.feedData(params.id);
      }
    );
  }
  feedData(id: number) {
    this.networkService.getProduct(id).subscribe(
      data => {
        var { id, name, price, stock, image } = { ...data };
        this.imagePreview = this.networkService.getProductImageURL(data.image);
        this.productForm.setValue({ id, name, price, stock });
      },
      error => {
        console.log(error.error.message);
        this.router.navigate(["/stock"]);
      }
    )
  }

  onPreviewImage(event) {
    const metaImage = event.target.files[0];
    if (metaImage) {
      this.file = metaImage;
      const reader = new FileReader();
      reader.readAsDataURL(metaImage);
      reader.onload = () => {
        this.imagePreview = reader.result;
      }
    }
  }

  onSubmit(productForm: NgForm) {
    if (productForm.invalid) {
      return;
    }
    const values = productForm.value;
    let product = new Product();
    product.name = values.name;
    product.price = values.price;
    product.stock = values.stock;
    product.image = this.file;

    this.networkService.editProduct(values.id, product).subscribe(
      data => {
        //alert(JSON.stringify(data));
        this.location.back();
      },
      error => {
        console.log(error.error.message);
      }
    );
  }

}
