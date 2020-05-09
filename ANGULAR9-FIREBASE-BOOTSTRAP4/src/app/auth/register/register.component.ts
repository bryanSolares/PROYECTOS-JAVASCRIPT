import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { AuthService } from "../../auth/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[AuthService]
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  });

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  async onRegister(){
    const {email, password} = this.registerForm.value;
    try {
      const user = this.authService.register(email,password);
      if (user) {
        this.router.navigate(["/verification-email"]);
      }
    } catch (error) {
      console.error(error);
    }
  }

}
