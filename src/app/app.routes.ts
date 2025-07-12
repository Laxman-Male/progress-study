import { Routes } from '@angular/router';
import { CreatePlanComponent } from './create-plan/create-plan.component';
import { HomepageComponent } from './homepage/homepage.component';
import { OwnPlanComponent } from './own-plan/own-plan.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [

    {
        path: 'create-plan', component: CreatePlanComponent
    },
    {
        path: '', component: HomepageComponent
    },
    {
        path: 'viewplan', component: OwnPlanComponent
    },
    {
        path: 'profile', component: ProfileComponent,
        children: [
            {
                path: 'own/plan/list',
                component: OwnPlanComponent
            }
        ]
    },
    {
        path: 'register', component: RegisterComponent
    }
    // {
    //     path:'own/plan/list', component:OwnPlanComponent
    // }
];
