import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { NgForm } from '@angular/forms';
import { Product } from '../../../models/product';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  constructor(public productService: ProductService, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.productService.getProducts();
    this.resetForm();
  }

  onSubmit(productForm: NgForm) {
    if (productForm.value.$key == null) {
      this.productService.insertProduct(productForm.value);
      this.toastrService.success("Successfull operation","Inserted");
    } else {
      this.productService.updateProduct(productForm.value);
      this.toastrService.success("Successfull operation","Updated");
    }
    this.resetForm(productForm);
  }

  resetForm(productForm?: NgForm) {
    if (productForm != null) {
      productForm.reset();
      this.productService.selectedProduc = new Product();
    }
  }
}
