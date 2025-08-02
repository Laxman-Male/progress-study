import { Routes } from '@angular/router';
import { CreatePlanComponent } from './create-plan/create-plan.component';
import { HomepageComponent } from './homepage/homepage.component';
import { OwnPlanComponent } from './own-plan/own-plan.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { OwnPlanDescriptionComponent } from './own-plan-description/own-plan-description.component';
import { QuestionsComponent } from './questions/questions.component';
// import { OwnPlanListComponent } from './own-plan-list/own-plan-list.component';

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
                path: 'own/plan',
                component: OwnPlanComponent,
                children:[
                    {
                        path:'pl/description/:title',
                        component: OwnPlanDescriptionComponent

                    }
                ]

            }
            // {
            //     path: 'own-plan-list', component: OwnPlanListComponent
            // },
        ]
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'questions', component: QuestionsComponent
    }
    //   {
    //                     path:'own-plan-list',
    //                     component: OwnPlanListComponent

    // },

    // {
        // path: 'own-plan-list', component: OwnPlanListComponent
    // }
    // {
    //     path: '**',
    //     redirectTo: '',
    //     pathMatch: 'full'
    // }
    // {
    //     path:'own/plan/list', component:OwnPlanComponent
    // }
];
