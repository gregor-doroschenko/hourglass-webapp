import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  redmineUrl: string;
  apiKey: string;
  rememberMe: boolean;

  isLoggedIn: boolean;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private userService: UserService) {
    this.isLoggedIn = this.authenticationService.isExpirationDateValid();
  }

  ngOnInit() { }

  login() {
    if (this.redmineUrl && this.apiKey) {
      this.authenticationService.login(this.redmineUrl, this.apiKey, this.rememberMe).subscribe(result => {
        this.userService.setUserName(result.user.firstname, result.user.lastname);
        const redirect = this.authenticationService.redirectUrl ? this.authenticationService.redirectUrl : '/';
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
      });
    }
  }

  logout() {
    this.authenticationService.logout();
    this.isLoggedIn = false;
  }

}
