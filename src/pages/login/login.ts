import { SplashPage } from './../splash/splash';
import { window } from 'rxjs/operator/window';
import { MapComponent } from './../../components/map/map';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { User } from './../../models/user';
import { Component, Input, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';
/**
 * Generated class for the LoginPage page.cls
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var FirebasePlugin: any;
@IonicPage()

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public recaptcha: firebase.auth.RecaptchaVerifier;
  public remember: boolean;
  loginForm: FormGroup;
  public response: boolean;
  user = {} as User;
  public isLogged: boolean;
  email: string;
  name: any;
  img: any;
  verificationId: any;
  code: string;
  number: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams, public afAuth: AngularFireAuth,
    public facebook: Facebook, public platform: Platform, private toastCtrl: ToastController, private authService: AuthServiceProvider,
    public fb: FormBuilder, private alertCtrl: AlertController, public menu: MenuController) {
    this.initForm(fb);
    this.user = new User();

    const storedUsername = this.authService.rememberUser();
    if (storedUsername) {
      this.remember = true;
      this.loginForm.controls['email'].setValue(storedUsername);
    }
  }
  ionViewDidLoad() {
    this.menu.enable(false);
  }
  ionViewDidLeave() {
    this.menu.enable(true);
  }

  facebookLogin() {
    if (this.response) return;
    this.response = true;
    this.facebook.login(['email', 'public_profile', 'user_friends']).then(res => {
      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {
          this.img = success.photoURL;
          this.navCtrl.push(HomePage, { name: success.displayName, img: success.photoURL });
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
    //this.login(value);
  }
  //Lembrar usuario
  rememberUser() {
    if (this.response) return;
  }
  alert(message: string, title: string) {
    this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    }).present();
  }
  //Botao de cadastrar usuario
  cadastrar() {
    this.navCtrl.push('RegisterPage');
  }


}
