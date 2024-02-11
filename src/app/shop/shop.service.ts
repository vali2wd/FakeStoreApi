import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ICategory } from '../shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://fakestoreapi.com/';
  constructor(private http: HttpClient) { }

  getProduct(id: number) {
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();
    if (shopParams.category !== '') {

      params = params.append('limit', shopParams.limit.toString());
      params = params.append('sort', shopParams.sort);

      return this.http.get<IProduct[]>(this.baseUrl + 'products/category/' + shopParams.category, { observe: 'response', params }).pipe(
        map(response => {
          return response.body;
        })
      );
      }


      params = params.append('limit', shopParams.limit.toString());
      params = params.append('sort', shopParams.sort);


      return this.http.get<IProduct[]>(this.baseUrl + 'products', { observe: 'response', params }).pipe(
        map(response => {
          return response.body;
        })
      );
    }

    getCategories(){
      return this.http.get<ICategory[]>(this.baseUrl + 'products/categories', {observe: 'response'}).pipe(  
        map(response => {
          return response.body;
        }));
    }

  
}
