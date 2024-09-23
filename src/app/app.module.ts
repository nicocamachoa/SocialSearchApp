import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import this
import { FormsModule } from '@angular/forms'; // For ngModel in forms

import { AppComponent } from './app.component';
import { UserDataComponent } from './user-data/user-data.component';
import { UserPostsComponent } from './user-posts/user-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDataComponent,
    UserPostsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Add this
    FormsModule, // Add this
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
