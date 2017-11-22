import { User } from './../../models/user';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { User } from '../../models/user';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  response: boolean;
  user = {} as User;
  email: any;
  name: any;
  img: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams, public afAuth: AngularFireAuth,
    public facebook: Facebook, public platform: Platform, private toastCtrl: ToastController,
    public fb: FormBuilder) {
    this.initForm(fb);
    this.user = new User();
  }
  async login(user: User) {
    this.response = true;
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      if (result) {
        this.name = result.email;
        this.navCtrl.setRoot(HomePage, { name: this.name });
      } else {
        console.log("Senha errada");
      }
    } catch (e) {
      console.error(e);
    }
  }
  facebookLogin() {
    this.facebook.login(['email']).then(res => {
      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      firebase.auth().signInWithCredential(facebookCredential)
        .then((sucess) => {
          this.user.email = sucess.email;
          this.name = sucess.displayName;
          this.img = sucess.photoURL;
          this.navCtrl.setRoot(HomePage, { name: this.name, photoURL: this.img });
        });
    });
  }
  cadastrar() {
    this.navCtrl.push('RegisterPage');
  }

  initForm(fb: FormBuilder) {
    this.loginForm = fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/[0-9]{6}/g)
        ])
      ]
    })
  }
  submitForm(value: any) {
    if (!this.loginForm.valid) return;
    this.user = new User(value.email, value.password);
    this.login(value);
  }


}
