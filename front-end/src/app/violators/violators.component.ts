import { Component, OnInit } from '@angular/core';
import { ViolatorService } from './violator.service';
import { Violator } from './violator.service';
import { response } from 'express';

@Component({
  selector: 'app-violators',
  standalone: false,

  templateUrl: './violators.component.html',
  styleUrl: './violators.component.css',
})
export class ViolatorsComponent {
  violatorData: Violator | null = null; // Store the violator data
  violatorId: string = ''; // Sample ID, can be dynamic
  // Initialize the violator data object
  violator: Violator = {
    violatorID: '',
    firstName: '',
    lastName: '',
    DoB: new Date(),
    email: '',
    contactNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
  };
  constructor(private violatorService: ViolatorService) {}

  ngOnInit(): void {
    this.fetchAllViolators();
  }

  fetchViolatorData(): void {
    if (!this.violatorId) {
      console.error('Violator ID is missing!');
      return;
    }

    this.violatorService.getViolator(this.violatorId).subscribe(
      (response) => {
        this.violatorData = response.data;
        console.log(this.violatorData);
      },
      (error) => {
        console.error('Error fetching violator data', error);
      }
    );
  }

  clearViolatorId() {
    this.violatorId = '';
    this.violatorData = null;
  }

  showForm = false;

  onSubmit(): void {
    this.violatorService.addViolator(this.violator).subscribe(
      (response) => {
        console.log('Violator added successfully', response);
        // You can reset the form or show a success message here
      },
      (error) => {
        console.error('Error adding violator', error);
        // Handle error appropriately (show error message to the user)
      }
    );
    console.log('Form submitted!');
    this.showForm = false;
  }
  
  violators: Violator[] = []; // Store the violators data
  violatorCount=0;
  fetchAllViolators(): void {
    this.violatorService.getAllViolators().subscribe(
      (response) => {
        this.violators = response.data;
        this.violatorCount=this.violators.length;
        console.log('All violators:', this.violators);
      },
      (error) => {
        console.error('Error fetching violators:', error);
      }
    );
  }
}
