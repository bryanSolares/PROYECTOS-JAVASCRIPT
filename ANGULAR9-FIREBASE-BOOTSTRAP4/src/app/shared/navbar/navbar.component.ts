import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers:[AuthService]
})
export class NavbarComponent {

  public user$:Observable<any> = this.authService.afAuth.user;

  constructor(private authService:AuthService, private router:Router) { }

  async onLogout(){
    try {
      this.authService.logout();
      this.router.navigate(["/login"]);  
    } catch (error) {
      console.log(error);
    }
  }

}
