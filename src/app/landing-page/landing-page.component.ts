import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


@Component({
 selector: 'app-landing-page',
 templateUrl: './landing-page.component.html'
})
export class LandingPageComponent implements OnInit {


 constructor(private router: Router) { }


 ngOnInit() {
 }


 navpage() {
   // Navigate to the specified route when button is clicked
   this.router.navigate(['/place-fitness-trainer-appointment']);
 }
}
