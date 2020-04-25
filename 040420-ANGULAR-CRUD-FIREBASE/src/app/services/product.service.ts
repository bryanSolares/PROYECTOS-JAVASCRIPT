import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Product } from '../models/product';

/*@Injectable({
  providedIn: 'root'
})*/
@Injectable()
export class ProductService {
  productList: AngularFireList<any>;
  selectedProduc: Product = new Product();

  constructor(private firebase: AngularFireDatabase) {}

  //Obtener productos
  getProducts() {
    return (this.productList = this.firebase.list('products'));
  }

  //Insertar producto
  insertProduct(product: Product) {
    this.productList.push({
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price
    });
  }

  //Actualizar producto
  updateProduct(product: Product) {
    this.productList.update(product.$key, {
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price
    });
  }

  //Eliminar producto
  deleteProduct($key: string) {
    this.productList.remove($key);
  }
}
