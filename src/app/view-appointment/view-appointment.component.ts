
import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { HttpClient } from '@angular/common/http';

@Component({
 selector: 'app-view-appointment',
 templateUrl: './view-appointment.component.html'
})
export class ViewAppointmentComponent implements OnInit {
 appointments: any[] = [];

 constructor(private userService: UserService, private http: HttpClient) { }

 ngOnInit() {
   this.getfitnessData();
 }

 // Method to get fitness data
 getfitnessData() {
   this.userService.getfitnessdata().subscribe(
     (data: any) => {
       this.appointments = data;
     },
     (error: any) => {
       this.appointments = null;
     }
   );
 }

 deleteAppointment(id: number) {
  this.http.delete(`http://localhost:6565/appointment/${id}`).subscribe(
    () => {
      // Remove the deleted appointment from the array
      this.appointments = this.appointments.filter((data) => data.id !== id);
      console.log('Appointment deleted successfully');

      if (this.appointments.length == 0) {
        this.appointments = null;
      }
    },
    (error) => {
      console.error('Error deleting appointment:', error);
      // Optionally, you can show a message to the user or handle the error in another way
    }
  );
}
}
