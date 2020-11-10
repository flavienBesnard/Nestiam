import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {

  user$: Observable<firebase.default.User>

  constructor(private afAuth: AngularFireAuth) { 
    this.user$ = afAuth.authState
  }

  signUpUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        this.afAuth.createUserWithEmailAndPassword(email, password).then(
          () => {
            console.log('Connected');
            resolve()
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
            resolve(data)
          }
        ).catch(
          (error) => {
            reject(error);
          }
        )
      })
  }

  async login() {
    await this.afAuth.signInWithRedirect(new firebase.default.auth.GoogleAuthProvider())
  }
  logout() {
    this.afAuth.signOut()
  }
}
