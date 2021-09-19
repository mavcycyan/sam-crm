import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserData} from '../interfaces';
import {GlobalVars} from '../globals';

@Injectable()
export class AuthService {

  loggedIn = false;

  constructor(private httpClient: HttpClient, private router: Router) {}

  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            resolve(this.loggedIn);
          },
          800
        );
      }
    );
    return promise;
  }

  login(loginData: UserData) {
    return this.httpClient.post<UserData>(environment.serverName + 'api/auth/login', loginData).subscribe(dat => {
        if (dat.message === 'Logged in!') {
            this.loggedIn = true;
            GlobalVars.userName = dat.name;
            this.router.navigate(['/']);
        }
    });
  }
  logout() {
    this.loggedIn = false;
  }
}
