import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  redmineUrl: string;
  apiKey: string;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() { }

  login() {
    if (this.redmineUrl && this.apiKey) {
      this.authenticationService.login(this.redmineUrl, this.apiKey).subscribe(result => {
        console.log(result);
      }, error => {
        console.log(error);
      });
    }
  }

}
