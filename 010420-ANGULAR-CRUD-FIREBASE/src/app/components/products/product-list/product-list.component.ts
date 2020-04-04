import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: Product[];

  constructor(private productService: ProductService, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.productService
      .getProducts()
      .snapshotChanges()
      .subscribe(items => {
        this.productList = [];
        items.forEach(elemento => {
          let x = elemento.payload.toJSON();
          x['$key'] = elemento.key;
          this.productList.push(x as Product);
        });
      });
  }

  onEdit(product: Product) {
    this.productService.selectedProduc = Object.assign({},product);
  }

  onDelete($key) {
    if (confirm("Are you sure you want to delete it?")) {
      this.productService.deleteProduct($key);
      this.toastrService.success("Successfull operation", "Product Deleted");
    }
  }
}
