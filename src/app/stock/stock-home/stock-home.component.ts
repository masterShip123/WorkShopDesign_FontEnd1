import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit(): void {
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
      }
    ]
    this.dataSource.data = dummy
  }

}
