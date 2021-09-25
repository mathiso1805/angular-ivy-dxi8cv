import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  registrarGroup;
  errMsg: any;

  constructor( 
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registrarGroup = this.formBuilder.group({
      usuario: '',
      password: ''
    });
   }

  ngOnInit() {
  }

  formSubmit() {
    this.errMsg = '';
    const { usuario, password } = this.registrarGroup.value;
    this.userService.register(usuario, password).subscribe(
      user => {
        this.userService.setUser(user);
        console.log(user);
        this.router.navigate(['/dashboard']);
      },
      ({ error: { mensaje } }) => {
        this.errMsg = mensaje;
      }
    );
  }
}