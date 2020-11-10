import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  // TEST
  user$: Observable<firebase.default.User>

  constructor(private afAuth: AngularFireAuth, private router: Router) { 
    this.user$ = afAuth.authState
  }

  signUpUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        this.afAuth.createUserWithEmailAndPassword(email, password).then(
          () => {
            console.log('Connected');
            resolve();
            // Observable
            this.loggedIn.next(true);
            this.router.navigate(['/home']);
          }
        ).catch(
          (error) => {
            reject(error);
          }
        )
      })
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        this.afAuth.signInWithEmailAndPassword(email, password).then(
          (data) => {
            console.log('Connected');
            resolve(data);
            // Observable
            this.loggedIn.next(true);
            this.router.navigate(['/home']);
          }
        ).catch(
          (error) => {
            reject(error);
          }
        )
      })
  }

  // PROF : connexion compte Google
  // async login() {
  //   await this.afAuth.signInWithRedirect(new firebase.default.auth.GoogleAuthProvider())
  // }

  // logout() {
  //   this.afAuth.signOut().then(function() {
  //     console.log('Signed Out');
  //   }, function(error) {
  //     console.error('Sign Out Error', error);
  //   });
  // }
    

  doLogout() {​​​​​​​​
    return new Promise(
      (resolve, reject) => {​​​​​​​​
        if(this.afAuth.currentUser)
        {​​​​​​​​
          this.afAuth.signOut();
          console.log('Disconnected');
          resolve();
          // Observable
          this.loggedIn.next(false);
          this.router.navigate(['/signin']);
        }​​​​​​​​else{​​​​​​​​
          reject();
        }​​​​​​​​
      }​​​​​​​​);
  }​​​​​​​​

  // TEST
  userStatus() {
    return this.afAuth.authState;
  }
}
