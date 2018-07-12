import { BrowserModule } from '@angular/platform-browser';
import { Component,NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


//import { AuthGuard } from './services/auth-guard.service';
//import { AuthService } from './services/auth.service'
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import{NgxPaginationModule} from 'ngx-pagination';
import {SelectModule} from 'ng-select';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
	HttpModule,
	FormsModule,
	SelectModule,
	NgxPaginationModule,
	HttpClientModule,
	RouterModule.forRoot([	
		{
			path: 'admin',
			//canActivate: [AuthGuard],
			loadChildren: './admin/admin.module#AdminModule'
		},	
		{
			path: '',
			//canActivate: [AuthGuard],
			loadChildren: './client/client.module#ClientModule'
		}
	])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
