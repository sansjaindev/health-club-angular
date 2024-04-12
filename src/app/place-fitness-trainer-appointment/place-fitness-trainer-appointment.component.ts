import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewAppointmentComponent } from '../view-appointment/view-appointment.component';
import { UserService } from '../_services';




export class Fitness {
 constructor(
   public inr: number,
   public paisa: number,
   public streetaddress: string,
   public city: string,
   public state: string,
   public country: string,
   public pincode: number,
   public phonenumber: number,
   public email: string,
   public firstname:string,
   public lastname: string,
   public age:number,
   public trainerpreference: string,
   public physiotherapist: string,
   public packages: string
 ) { }
}


@Component({
 selector: 'app-place-fitness-trainer-appointment',
 templateUrl: './place-fitness-trainer-appointment.component.html'
 })
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {




 fitnessForm: FormGroup;
 amount: number = 0;
  constructor(public fb: FormBuilder, public userservice:UserService) { }


  ngOnInit() {
      
    this.fitnessForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', Validators.required],
      phonenumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      streetaddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      pincode: ['', Validators.required],
      trainerpreference: ['', Validators.required],
      physiotherapist: ['', Validators.required],
      packages: ['', Validators.required],
      weeks: [''],
      inr: ['', Validators.required],
      paisa: ['', Validators.required]
    });

    this.fitnessForm.get('packages').valueChanges.subscribe(() => {
      this.calculateAmount();
    });

    this.fitnessForm.get('physiotherapist').valueChanges.subscribe(() => {
      this.calculateAmount();
  });

    this.fitnessForm.get('weeks').valueChanges.subscribe(() => {
      this.calculateAmount();
    });
  }
   



onSubmit() {
 console.log(this.fitnessForm.value);
 this.postDetails();

  }

  postDetails() {
    if (this.fitnessForm.invalid) {
      return;
    }

    const formData : Fitness = this.fitnessForm.value;

    this.userservice.postfitnessdata(formData).subscribe(
      (data: any) => {
        this.fitnessForm.reset();
      },
      (error: any) => {
        console.error('error : ', error)
      }
    );
  }

  calculateAmount() {
    const packageAmounts = {
      'one_time_appointment': 500,
      'four_sessions_per_week': 1600,
      'five_sessions_per_week': 1500
    };

    let amount = packageAmounts[this.fitnessForm.get('packages').value];

    if (this.fitnessForm.get('physiotherapist').value === 'yes') {
      amount += 200;
    }
    
    if (this.fitnessForm.get('packages').value !== 'one_time_appointment') {
      amount *= this.fitnessForm.get('weeks').value;
    }
    
    this.amount = amount;
    this.fitnessForm.get('inr').setValue(amount);
    this.fitnessForm.get('paisa').setValue(0);
  }


  
}
