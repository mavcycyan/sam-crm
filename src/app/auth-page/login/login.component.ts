import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
      this.form = new FormGroup({
          login: new FormControl('', Validators.required),
          password: new FormControl('', Validators.required)
      });
  }

  login() {
      if (this.form.status !== 'INVALID') {
          this.authService.login(
              {
                  login: this.form.controls.login.value,
                  password: this.form.controls.password.value}
              );
      }
  }

}
