import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {


  private overlayRef: OverlayRef = this.createOverlay();
  private templatePortal: TemplatePortal<any>;

  indetermina: Subject<boolean> = new Subject();
  determina: Subject<number> = new Subject();

  constructor(private overlay: Overlay) {
    this.indetermina.subscribe(
      show => {
        if (show && !this.overlayRef.hasAttached()) {
          this.showSpinner();
        } else if (!show && this.overlayRef.hasAttached()) {
          this.hideSpinner();
        }
      }
    );
    this.determina.subscribe(
      number => {
        if (number <= 100 && !this.overlayRef.hasAttached()) {
          this.showSpinner();
        } else if (number >= 100 && !this.overlayRef.hasAttached()) {
          this.hideSpinner();
        }
      }
    );
  }

  private createOverlay(): OverlayRef {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'custom-backdrop',
      positionStrategy: this.overlay.position()
        .global()
        .centerVertically()
        .centerHorizontally()
    });
  }

  showSpinner() {
    this.overlayRef.attach(this.templatePortal);
  }
  private hideSpinner() {
    this.overlayRef.detach();
  }

  attach(templatePortalContent: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    this.templatePortal = new TemplatePortal(
      templatePortalContent,
      viewContainerRef
    );
  }
}
