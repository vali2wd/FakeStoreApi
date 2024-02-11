import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';
import { ICategory } from '../shared/models/category';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: true }) searchTerm: ElementRef;
  products: IProduct[];
  categories: ICategory[];
  shopParams = new ShopParams();
  sortOptions = [{ name: "↑ Price", value: 'asc' }, { name: '↓ Price', value: 'desc' }];
  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }
  onSearch() {
    // this.shopParams.search = this.searchTerm.nativeElement.value;
    // this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onReset() {
   
    this.shopParams = new ShopParams();
    this.getProducts();
  }
  getProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(response => {
      this.products = response;
    }, error => {
      console.log(error);
    });
  }

  getCategories() {
    this.shopService.getCategories().subscribe(response => {
      this.categories = response;
      console.log(this.categories);
    }, error => {
      console.log(error);
    }
    )
  }

  // onCategorySelected(typeId:number){
  //   this.shopParams. = typeId;
  //   this.shopParams.pageNumber = 1;
  //   this.getProducts();
  // }
  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onCategorySelected(category: string) {
    this.shopParams.category = category;
    this.getProducts();
  }
  // onPageChange(event: any){
  //   if(this.shopParams.pageNumber !== event){
  //   this.shopParams.pageNumber = event;
  //   this.getProducts();
  //   }
  // }
}
