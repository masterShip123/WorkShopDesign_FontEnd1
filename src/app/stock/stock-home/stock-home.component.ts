import Swal from 'sweetalert2';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product, ProductResponse } from 'src/app/models/product.model';
import { NetworkService } from 'src/app/services/network.service';
import { LoadingService } from 'src/app/services/loading.service';

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

  constructor(
    private networkService: NetworkService) { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.feedData();
  }

  feedData() {
    //async
    // subscribe (observer) เฝ้าสังเกตุการณ์
    this.networkService.getProducts().subscribe(
      data => { //suscess
        this.dataSource.data = data.map(item => {
          item.image = this.networkService.getProductImageURL(item.image);
          return item;
        });
      },
      error => {
        alert(JSON.stringify(error.error.message));
      },
      () => { //complete
        console.log('Feed net Work');
      }
    )


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

  onClickDeleteProduct(product: ProductResponse) {
    //Confrerm
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete Product: ${product.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.isConfirmed) {
        this.networkService.deleteProduct(product.id).subscribe(
          data => {
            // Swal.fire(
            //   'Deleted!',
            //   'Your file has been deleted.',
            //   'success'
            // )
            this.feedData();
          },
          error => {
            console.log(JSON.stringify(error.message))
          }
        )

      }
    })


  }
}
