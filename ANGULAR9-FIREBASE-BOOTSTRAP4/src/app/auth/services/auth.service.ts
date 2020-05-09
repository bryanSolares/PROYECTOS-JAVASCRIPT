import { Injectable } from '@angular/core';

//import { auth } from "firebase/auth";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";
import { first } from "rxjs/operators";

@Injectable()
export class AuthService {

  public user:User;

  constructor(public afAuth:AngularFireAuth) { }

  async resetPassword(email:string):Promise<void>{
    try {
      return await this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error)
    }
  }

  async sendVerificationEmail():Promise<void>{
    try {
      return await (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) { 
      console.log(error)
    }
  } 

  async login(email:string, password:string){
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email,password);
      return result;
    } catch (error) {
      console.error(error);      
    }
    
  }

  async register(email:string,password:string){
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email,password);
      this.sendVerificationEmail();
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  async logout(){
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.error(error);
    }
  }

  getCurrentUser(){
    return this.afAuth.authState.pipe(first()).toPromise();
  }

}
