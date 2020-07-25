import { Injectable } from '@angular/core';
import { User as firebaseUser } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: firebaseUser = null;
  firebase

  constructor(private afAuth: AngularFireAuth,
    private userService: UserService) {
    this.afAuth.authState.subscribe((user) => this.currentUser = user);
  }

  get isLoged(): boolean {
    return this.currentUser !== null;
  }

  get CurrentUser(): any {
    return this.isLoged ? this.currentUser : null;
  }

  get CurrentUserObservable(): any {
    return this.afAuth.authState;
  }

  get CurrentUserId(): string {
    return this.isLoged ? this.currentUser.uid : '';
  }


  async onLogin(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  onLogOut() {
    this.afAuth.signOut();
  }

  async onRegister(email: string, password: string): Promise<any> {
    this.afAuth.createUserWithEmailAndPassword(email, password).then(result => {
      result.user.updateProfile(
        {
          displayName: 'Rodolfo Lopez'
        }
      );
      this.onLogOut();
    }).catch(error => console.log(error));
  }
}
