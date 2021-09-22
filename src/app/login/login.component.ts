import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginGroup;
  errMsg: any;

  constructor( 
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginGroup = this.formBuilder.group({
      usuario: 'rigoberta',
      password: 'menchu'
    });
   }

  ngOnInit() {
  }

  formSubmit() {
    this.errMsg = '';
    const { usuario, password } = this.loginGroup.value;
    this.userService.login(usuario, password).subscribe(
      user => {
        this.userService.setUser(user);
        console.log(user);
        this.router.navigate(['/list']);
      },
      ({ error: { mensaje } }) => {
        this.errMsg = mensaje;
      }
    );
  }

}