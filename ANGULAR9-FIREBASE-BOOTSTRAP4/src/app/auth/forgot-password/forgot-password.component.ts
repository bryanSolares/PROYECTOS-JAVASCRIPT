import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [AuthService],
})
export class ForgotPasswordComponent implements OnInit {
  userEmail = new FormControl('');

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async onResetPassword() {
    try {
      const email = this.userEmail.value;
      await this.authService.resetPassword(email);
      window.alert('Se ha enviado un email, por favor comprobar');
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }
}
