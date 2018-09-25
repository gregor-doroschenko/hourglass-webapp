import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  username: string;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.username = this.userService.getUserName();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
