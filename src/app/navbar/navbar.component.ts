import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit  {
  // TEST
  user: Observable<firebase.default.User>;

  isLoggedIn$: Observable<boolean>; 
 

  constructor(private location : Location, public auth: AuthenticationService) { 
    this.user = this.auth.userStatus();
  }

  ngOnInit() {
    this.isLoggedIn$ = this.auth.isLoggedIn;
  }

  logout() {
    this.auth.doLogout()
    .then((res) => {
      this.location.back();
      console.log("Disconnected");
    }, (error) => {
      console.log("Logout error", error);
    });
  }
}