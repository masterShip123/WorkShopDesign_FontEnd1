import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'WorkShop1';
  moblieQueryMax: MediaQueryList;

  private mobileQueryListener: () => void; //ตรวจสภาวะที่ต้องการหรือไม้

  // dependensy Injection (DI) คุณสมบัติฉีกขาด , ไม่มีการ New Object เข้ามา
  constructor(changDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    //ทำ Native
    this.mobileQueryListener = () => changDetectorRef.detectChanges();
    this.moblieQueryMax = media.matchMedia('(max-width:600px)');
    this.moblieQueryMax.addListener(this.mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.moblieQueryMax.removeListener(this.mobileQueryListener);
  }
  onSayhai(text: String) {
    //alert(text);
  }
}
