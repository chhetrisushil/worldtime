import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./page/login/login.component";
import {HomeComponent} from "./page/home/home.component";
import {SignupComponent} from "./page/signup/signup.component";
import {DashboardComponent} from "./page/dashboard/dashboard.component";

const appRoutes:Routes = [

  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'zones', component: DashboardComponent}

/*
  {path: 'imagine', component: ImagineDetailsComponent},
  {path: 'contribute', component: ContributeComponent},
  {path: 'faq', component: FaqComponent},
  {path: 'privacy', component: PrivacyComponent},
  //{path: 'ideas', component: IdeasComponent, canActivate: [AuthGuard], pathMatch: 'full'},
  {path: 'ideas', component: IdeasComponent, pathMatch: 'full'},

  {path: 'inspiring', component: InspiringIdeasComponent},
  {path: 'ideas/:id', component: IdeaDetailComponent, pathMatch: 'full'},
  {path: 'reset/:id', component: ForgotComponent, pathMatch: 'full'},
  {path: 'ideasBy/:id', component: IdeaByUserComponent, pathMatch: 'full'},
  {path: 'joined', component: JoinedComponent, canActivate: [AuthGuard], pathMatch: 'full'},
  {path: 'new-idea', component: NewIdeaComponent, canActivate: [AuthGuard], pathMatch: 'full'},

  /*{path: 'ideas', component: IdeasComponent, children: [
    {path: ':id', component: IdeaDetailComponent},
    {path: 'new', component: NewIdeaComponent}
  ]},*/
/*
  {path: 'profile', canActivate: [AuthGuard], component: ProfileComponent, children: [
    {path: '', component: ProfileHomeComponent, pathMatch: 'full'},
    {path: 'notifications', component: ProfileNotificationsComponent},
  ]},
  {path: 'location', component: LocationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},

  {path:'**', component: NotfoundComponent}
  */
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
