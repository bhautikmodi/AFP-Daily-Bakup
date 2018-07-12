import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';

@Injectable()
export class HttpInterceptorClassService implements HttpInterceptor { 
  constructor(private router: Router){

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { debugger
    req = req.clone({
      setHeaders: {
        Authorization: `${localStorage.getItem('token')}`
      }
      
    });
    
    return next.handle(req).do((event: HttpEvent<any>) => { debugger
      if (event instanceof HttpResponse) {
        if(event.body.error_code==2008){
          return this.router.navigate(['/pagenotfound']);
        } else {
          return next.handle(req);
        }        
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 406) {
          // redirect to the login route
          // or show a modal
        }
        return next.handle(req);
      }
    });
    
  }
} 
