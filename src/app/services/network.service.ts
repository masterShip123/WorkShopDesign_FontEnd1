import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product, ProductResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<ProductResponse[]> {
    return this.httpClient.get<ProductResponse[]>(`product`);
  }

  getProduct(id: number): Observable<ProductResponse> {
    return this.httpClient.get<ProductResponse>(`product/${id}`);
  }

  getProductImageURL(image: string): string {
    if (image) {
      return `${environment.baseURL}images/${image}`;
    }
    return 'src/assets/images/no-image.png';

  }

  addProduct(product: Product): Observable<ProductResponse> {
    return this.httpClient.post<ProductResponse>(`product`, this.makeFormData(product), {
      reportProgress: true
    });
  }

  editProduct(id: number, product: Product): Observable<ProductResponse> {
    return this.httpClient.put<ProductResponse>(`product/${id}`, this.makeFormData(product), {
      reportProgress: true
    });
  }

  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete<any>(`product/${id}`);
  }

  makeFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', `${product.price}`);
    formData.append('stock', `${product.stock}`);
    formData.append('photo', product.image);
    return formData;
  }
}
