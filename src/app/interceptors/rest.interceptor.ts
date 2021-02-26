import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, finalize, delay } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class RestInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar, private loadingService: LoadingService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = `${environment.baseURL}api/${request.url}`;
    const urlReq = request.clone({ url });

    if (!request.reportProgress) {
      this.loadingService.indetermina.next(true);
    }

    return next.handle(urlReq).pipe(
      tap(
        event => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round(100 * event.loaded / event.total);
              console.log(progress);
              this.loadingService.determina.next(progress);

              break;
            case HttpEventType.Response:
              const config: MatSnackBarConfig = {
                duration: 4000,
                verticalPosition: 'top',
                horizontalPosition: 'end',
                panelClass: ['snackbar', 'snackbar-susses']
              };

              switch (event.status) {
                case 200:
                  if (request.method === 'PUT') {
                    this.snackBar.open('Edit Success', null, config);
                  } else if (request.method === 'POST') {
                    console.log('CheckStatus : ' + event.status);
                    this.snackBar.open('Create Success', null, config);
                  }
                  break;
                case 201:
                  console.log('CheckStatus : ' + event.status);
                  this.snackBar.open('Create Success', null, config);
                  break;
                case 204:
                  this.snackBar.open('Delete Success', null, config);
                  break;
              }
              break;
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            const config: MatSnackBarConfig = {
              duration: 4000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
              panelClass: ['snackbar', 'snackbar-error']
            };
            if (error.status === 401 || error.status === 403) {
              this.snackBar.open('UnAuthen', null, config);
            }
            if (error.status === 404 && error.error.message) {
              this.snackBar.open(error.error.message, null, config);
            } else {
              this.snackBar.open(error.message, null, config);
            }
          }
        }
      ),
      delay(1000),
      finalize(() => {
        this.loadingService.indetermina.next(false);
      })
    );
  }
}
