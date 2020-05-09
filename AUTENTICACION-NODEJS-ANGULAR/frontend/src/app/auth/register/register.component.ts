import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { UserI } from "../../models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authServide:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onRegister(form){
    this.authServide.register(form.value).subscribe(response => this.router.navigateByUrl("/auth"),error=>console.error(error));
  }

}
