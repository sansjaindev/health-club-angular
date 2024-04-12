import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../_services';

export class Contact {
 constructor(
   public firstname: string,
   public lastname: string,
   public phonenumber: number,
   public email: string,
   public message: string
 ) { }
}
@Component({
 selector: 'app-contact-us',
 templateUrl: './contact-us.component.html'
})
export class ContactUsComponent implements OnInit {
 @Output() contactdata = new EventEmitter<Contact>();
 contactForm: FormGroup;
 public obj: any = {};
 constructor(private fb: FormBuilder) { }
//  constructor(private fb: FormBuilder, private userservice: UserService) { }




 ngOnInit() {
   this.contactForm = this.fb.group({
     firstname: ['', [Validators.required]],
     lastname: ['', [Validators.required]],
     phonenumber: ['', [Validators.required]],
     email: ['', [Validators.required,Validators.pattern("[^ @]*@[^ @]*")]],
     message:['',[Validators.required]]
   });
 }


 onSubmit() {
   this.obj = { ...this.contactForm.value, ...this.obj };
   if (this.contactForm.value) {
     console.log(
       "LOG: LoginComponent -> onSubmit -> this.contactForm.value",
       this.contactForm.value
      );
      
      if (
        this.contactForm.valid &&
        this.contactForm.value.firstname &&
        this.contactForm.value.lastname &&
        this.contactForm.value.phonenumber &&
        this.contactForm.value.email &&
        this.contactForm.value.message
      ) {
        const contact: Contact = this.contactForm.value;
        
        
        
        // this.postDetails();
        this.contactdata.emit(contact);
        this.contactForm.reset();
      }
      
  }
  
  
}

// postDetails() {
//   if (this.contactForm.invalid) {
//     return;
//   }

//   // const formData : Contact = this.contactForm.value;
//   this.userservice.postquerydata(this.contactForm.value).subscribe(
//     (data: any) => {
//       this.contactForm.reset();
//     },
//     (error: any) => {
//       console.error('error : ', error)
//     }
//   );
// }
  
}

