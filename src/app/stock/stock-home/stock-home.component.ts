import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.css']
})
export class StockHomeComponent implements OnInit {

  displayedColumn = ['image', 'name', 'price', 'stock', 'action']

  dataSource = new MatTableDataSource<Product>();

  textSearch: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort; // Call กับ Html
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator; // Call ทำ Pagin ฝั่ง Data Table

  constructor() { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.feedData();
  }

  feedData() {
    const dummy: Product[] = [
      {
        name: "Veniam nemo ut dolores qui et ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        stock: 1,
        price: 20000,
        image: "https://www.flaticon.com/svg/vstatic/svg/141/141078.svg?token=exp=1614078478~hmac=772a0d9f0f2c5d746887c8c805138cec",
      },
      {
        name: "mac book",
        stock: 22222,
        price: 20000,
        image: "https://www.flaticon.com/svg/vstatic/svg/141/141078.svg?token=exp=1614078478~hmac=772a0d9f0f2c5d746887c8c805138cec",
      },
      {
        name: "mac book",
        stock: 3333,
        price: 20000,
        image: "https://www.flaticon.com/svg/vstatic/svg/141/141078.svg?token=exp=1614078478~hmac=772a0d9f0f2c5d746887c8c805138cec",
      },
      {
        name: "mac book",
        stock: 445,
        price: 20000,
        image: "https://www.flaticon.com/svg/vstatic/svg/141/141078.svg?token=exp=1614078478~hmac=772a0d9f0f2c5d746887c8c805138cec",
      },
      {
        name: "mac book",
        stock: 588,
        price: 20000,
        image: "https://www.flaticon.com/svg/vstatic/svg/141/141078.svg?token=exp=1614078478~hmac=772a0d9f0f2c5d746887c8c805138cec",
      },
      {
        name: "Veniam nemo ut dolores qui et ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        stock: 1,
        price: 20000,
        image: "https://www.flaticon.com/svg/vstatic/svg/141/141078.svg?token=exp=1614078478~hmac=772a0d9f0f2c5d746887c8c805138cec",
      },
      {
        name: "mac book",
        stock: 22222,
        price: 20000,
        image: "https://www.flaticon.com/svg/vstatic/svg/141/141078.svg?token=exp=1614078478~hmac=772a0d9f0f2c5d746887c8c805138cec",
      },
      {
        name: "mac book",
        stock: 3333,
        price: 20000,
        image: "https://www.flaticon.com/svg/vstatic/svg/141/141078.svg?token=exp=1614078478~hmac=772a0d9f0f2c5d746887c8c805138cec",
      },
      {
        name: "mac book",
        stock: 445,
        price: 20000,
        image: "https://www.flaticon.com/svg/vstatic/svg/141/141078.svg?token=exp=1614078478~hmac=772a0d9f0f2c5d746887c8c805138cec",
      },
      {
        name: "mac book",
        stock: 588,
        price: 20000,
        image: "https://www.flaticon.com/svg/vstatic/svg/141/141078.svg?token=exp=1614078478~hmac=772a0d9f0f2c5d746887c8c805138cec",
      }
    ]
    this.dataSource.data = dummy
  }

  search(event: Event) {
    let fillterValue = '';
    if (event) {
      fillterValue = (event.target as HTMLInputElement).value; // แปลงเป็น Input แล้วดึงค่าออกมา
    }
    this.dataSource.filter = fillterValue.trim().toLowerCase(); // Search Datable ผ่าน filter
  }
  clearSearch() {
    this.textSearch = '';
    this.search(null);
  }
}
