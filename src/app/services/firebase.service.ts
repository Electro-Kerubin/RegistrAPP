import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private auth: Auth,
    private firestore: AngularFirestore
  ) { }

  validateEmailAndPass(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

   getDataByEmail(email: string) {
     return this.firestore.collection('usuarios', ref => ref.where('correo', '==', email)).valueChanges()
   }


}
