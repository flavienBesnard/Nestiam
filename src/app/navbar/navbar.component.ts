import { Component, OnInit } from '@angular/core';
import { faSearch, faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  { // flavien

  constructor(
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    
  }
}