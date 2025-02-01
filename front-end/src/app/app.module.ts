import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // Ensure this is correctly imported
import { FormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViolatorsComponent } from './violators/violators.component';
import { ViolatorService } from './violators/violator.service';  // Import ViolatorService

@NgModule({
  declarations: [
    AppComponent,
    ViolatorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,  // Ensure HttpClientModule is in the imports array
    FormsModule
  ],
  providers: [ViolatorService],  // Make sure ViolatorService is in providers
  bootstrap: [AppComponent]
})
export class AppModule { }
