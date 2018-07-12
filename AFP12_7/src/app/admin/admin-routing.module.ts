import { BrowserModule } from '@angular/platform-browser';
import { Component,NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from "@angular/common";

import { AdminComponent  } from './admin.component.module';

import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DomainComponent } from './domain/domain.component';
import { DomainListComponent } from './domain-list/domain-list.component';
import { CompetencyAreaComponent } from './competency-area/competency-area.component';
import { CompetencyAreaListComponent } from './competency-area-list/competency-area-list.component';
import { KsaComponent } from './ksa/ksa.component';
import { KsaListComponent } from './ksa-list/ksa-list.component';
import { RatingScaleComponent } from './rating-scale/rating-scale.component';
import { RatingScaleListComponent } from './rating-scale-list/rating-scale-list.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { DomainService } from './services/domain.service';

import { CompetencyAreaService } from './services/competency-area.service';
import { KsaService } from './services/ksa.service';
import { RatingScaleService } from './services/rating-scale.service';

import { CourseComponent } from './course/course.component';
import { CourselistComponent } from './courselist/courselist.component';
import { CourseService } from './services/course.service';

import { Globals } from './globals';
import { HtmlToPlaintextPipe } from './html-to-plaintext.pipe';
import { IndustryComponent } from './industry/industry.component';
import { IndustrylistComponent } from './industrylist/industrylist.component';
import { IndustryService } from './services/industry.service';

import { UserComponent } from './user/user.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UserService } from './services/user.service';
import { StateService } from './services/state.service';
import { CompanyService } from './services/company.service';
import { StateComponent } from './state/state.component';
import { StatelistComponent } from './statelist/statelist.component';
import { CompanyComponent } from './company/company.component';
import { CompanylistComponent } from './companylist/companylist.component';
import { UserroleComponent } from './userrole/userrole.component';
import { UserrolelistComponent } from './userrolelist/userrolelist.component';
import { SettingsComponent } from './settings/settings.component';

import { UserroleService } from './services/userrole.service';

import { CountryComponent } from './country/country.component';
import { CountrylistComponent } from './countrylist/countrylist.component';
import { CountryService } from './services/country.service';
import { SettingsService } from './services/settings.service';
import { InvitationComponent } from './invitation/invitation.component';
import { InvitationlistComponent } from './invitationlist/invitationlist.component';
import { InvitationService } from './services/invitation.service';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { PlaceholderListComponent } from './placeholder-list/placeholder-list.component';
import { PlaceholderService } from './services/placeholder.service';

import { RemainingComponent } from './remaining/remaining.component';
import { RemainingService } from './services/remaining.service';
import { RemaininglistComponent } from './remaininglist/remaininglist.component';
import { EmailtemplateComponent } from './emailtemplate/emailtemplate.component';
import { EmailtemplateListComponent } from './emailtemplate-list/emailtemplate-list.component';
import { EmailtemplateService } from './services/emailtemplate.service';
import { CourselevelComponent } from './courselevel/courselevel.component';
import { CourselevellistComponent } from './courselevellist/courselevellist.component';
import { CourselevelService } from './services/courselevel.service';
import { RolepermissionComponent } from './rolepermission/rolepermission.component';
import { RolepermissionService } from './services/rolepermission.service';
import { CommonService } from './services/common.service';
import { PendingAssessmentComponent } from './pending-assessment/pending-assessment.component';
import { PendingAssessmentService } from './services/pending-assessment.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorClassService } from './http-interceptor-class.service';
import { HttpClientModule } from '@angular/common/http';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { EmailLogComponent } from './email-log/email-log.component';
import { AuditlogService } from './services/auditlog.service';
import { LoginLogComponent } from './login-log/login-log.component';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import {SelectModule} from 'ng-select';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [	
  {
    path: '',
        component: AdminComponent,
        children: [
		  
		  { path : 'dashboard', component : DashboardComponent,canActivate : [AuthGuard] },
		  { path : 'login', component : LoginComponent,canActivate : [AuthGuard] },
		  { path : 'access-denied', component : AccessDeniedComponent,canActivate : [AuthGuard] },
		  { path : 'domain/add', component : DomainComponent,canActivate : [AuthGuard] },
		  { path : 'domain/edit/:id', component : DomainComponent,canActivate : [AuthGuard] },
		  { path : 'domain/list', component : DomainListComponent,canActivate : [AuthGuard] },
		  { path : 'remaining', component : RemainingComponent,canActivate : [AuthGuard] },
		  { path : 'remaining/list', component : RemaininglistComponent,canActivate : [AuthGuard] },
		  { path : 'competency-area/add', component : CompetencyAreaComponent,canActivate : [AuthGuard] },
		  { path : 'competency-area/edit/:id', component : CompetencyAreaComponent,canActivate : [AuthGuard] },
		  { path : 'competency-area/list', component : CompetencyAreaListComponent,canActivate : [AuthGuard] },
		  { path : 'courselevel/add', component : CourselevelComponent,canActivate : [AuthGuard] },
		  { path : 'courselevel/list', component : CourselevellistComponent,canActivate : [AuthGuard] },
		  { path : 'courselevel/edit/:id', component : CourselevelComponent,canActivate : [AuthGuard] },
		  { path : 'course/add', component : CourseComponent,canActivate : [AuthGuard] },
		  { path : 'course/list', component : CourselistComponent,canActivate : [AuthGuard] },
		  { path : 'course/edit/:id', component : CourseComponent,canActivate : [AuthGuard] },
		  { path : 'industry/add', component : IndustryComponent,canActivate : [AuthGuard] },
		  { path : 'industry/list', component : IndustrylistComponent,canActivate : [AuthGuard] },
		  { path : 'industry/edit/:id', component : IndustryComponent,canActivate : [AuthGuard] },
		  { path : 'userrole/edit/:id', component : UserroleComponent,canActivate : [AuthGuard] },
		  { path : 'users/edit/:id', component : UserComponent,canActivate : [AuthGuard] },
		  { path : 'users/list', component : UserlistComponent,canActivate : [AuthGuard] },
		  { path : 'state/add', component : StateComponent,canActivate : [AuthGuard] },
		  { path : 'state/list', component : StatelistComponent,canActivate : [AuthGuard] },
		  { path : 'state/edit/:id', component : StateComponent,canActivate : [AuthGuard] },
		  { path : 'company/list', component : CompanylistComponent,canActivate : [AuthGuard] },
		  { path : 'company/edit/:id', component : CompanyComponent,canActivate : [AuthGuard] },
		  { path : 'country/add', component : CountryComponent,canActivate : [AuthGuard] },
		  { path : 'country/list', component : CountrylistComponent,canActivate : [AuthGuard] },
		  { path : 'country/edit/:id', component : CountryComponent,canActivate : [AuthGuard] },
		  { path : 'ksa/add', component : KsaComponent,canActivate : [AuthGuard] },
		  { path : 'ksa/edit/:id', component : KsaComponent,canActivate : [AuthGuard] },
		  { path : 'ksa/list', component : KsaListComponent,canActivate : [AuthGuard] },
		  { path : 'rating-scale/add', component : RatingScaleComponent,canActivate : [AuthGuard] },
		  { path : 'rating-scale/edit/:id', component : RatingScaleComponent,canActivate : [AuthGuard] },
		  { path : 'rating-scale/list', component : RatingScaleListComponent,canActivate : [AuthGuard] },
		  { path : 'settings', component : SettingsComponent,canActivate : [AuthGuard] },
		  { path : 'invite-a-user/add', component : InvitationComponent,canActivate : [AuthGuard] },
		  { path : 'invite-a-user/list', component : InvitationlistComponent,canActivate : [AuthGuard] },
		  { path : 'placeholder/add', component : PlaceholderComponent,canActivate : [AuthGuard] },
		  { path : 'placeholder/edit/:id', component : PlaceholderComponent,canActivate : [AuthGuard] },
		  { path : 'placeholder/list', component : PlaceholderListComponent,canActivate : [AuthGuard] },
		  { path : 'emailtemplate/add', component : EmailtemplateComponent,canActivate : [AuthGuard] },
		  { path : 'emailtemplate/edit/:id', component : EmailtemplateComponent,canActivate : [AuthGuard] },
		  { path : 'emailtemplate/list', component : EmailtemplateListComponent,canActivate : [AuthGuard] },
		  { path : 'rolepermission', component : RolepermissionComponent,canActivate : [AuthGuard] },
		  { path : 'pending-assessment',component : PendingAssessmentComponent,canActivate : [AuthGuard] },
		  { path : 'email-log', component : EmailLogComponent,canActivate : [AuthGuard] },
		  { path : 'login-log', component : LoginLogComponent,canActivate : [AuthGuard] },
		  { path : 'activity-log',component : ActivityLogComponent,canActivate : [AuthGuard] },
		  { path : 'pagenotfound', component : ErrorComponent, canActivate : [AuthGuard] },
		  { path : '', redirectTo: 'dashboard', pathMatch:'full'},
		  { path : '**', redirectTo : 'dashboard' }
        ]
  }
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule],
 
  providers: [Globals,AuthService,AuthGuard,DomainService,KsaService,RatingScaleService,CompetencyAreaService,
    CourselevelService,CourseService,IndustryService,CountryService,UserService,StateService,CompanyService,
    UserroleService,SettingsService,InvitationService,PlaceholderService,RemainingService,EmailtemplateService,
    RolepermissionService,CommonService,PendingAssessmentService,AuditlogService,
    {
    provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorClassService,
      multi: true
    }
  ],
  bootstrap: [AdminComponent]
})
export class AdminRoutingModule  { }
