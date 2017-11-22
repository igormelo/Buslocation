import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { User } from './../../models/user';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, LoadingController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
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
  public remember: boolean;
  loginForm: FormGroup;
  public response: boolean;
  user = {} as User;
  email: any;
  name: any;
  img: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams, public afAuth: AngularFireAuth,
    public facebook: Facebook, public platform: Platform, private toastCtrl: ToastController, private authService: AuthServiceProvider,
    public fb: FormBuilder, private alertCtrl: AlertController) {
    this.initForm(fb);
    this.user = new User();
    const storedUsername = this.authService.rememberUser();
    console.log(storedUsername);
    if (storedUsername) {
      this.remember = true;
      this.loginForm.controls['email'].setValue(storedUsername);
    }
  }

  //Botao de login do usuario
  login(user: User) {
    if (this.response) return;
    this.response = true;
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(data => {
        this.authService.setRememberUser(data.email);
        this.email = data.email;
        this.navCtrl.setRoot(HomePage, { name: this.email })
      })
      .catch(error => {
        this.alert(error.message);
      });

  }
  //Botao de login com Facebook
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
  //Forms
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
      ],
      rememberUser: true
    })
  }
  submitForm(value: any) {
    if (!this.loginForm.valid) return;
    this.user = new User(value.email, value.password);
    this.login(value);
  }
  //Lembrar usuario
  rememberUser() {
    if (this.response) return;
  }
  alert(message: string) {
    this.alertCtrl.create({
      title: 'Atenção!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }
  //Botao de cadastrar usuario
  cadastrar() {
    this.navCtrl.push('RegisterPage');
  }

}
