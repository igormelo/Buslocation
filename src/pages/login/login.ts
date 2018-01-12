import { SplashPage } from './../splash/splash';
import { window } from 'rxjs/operator/window';
import { MapComponent } from './../../components/map/map';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { User } from './../../models/user';
import { Component, Input, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HomePage } from '../home/home';
import firebase from 'firebase';
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
  //public recaptcha: firebase.auth.RecaptchaVerifier;
  public remember: boolean;
  loginForm: FormGroup;
  public response: boolean;
  user = {} as User;
  public isLogged: boolean;
  email: string;
  name: any;
  img: any;
  verificationId: any;
  code: string = "";
  number: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams, public afAuth: AngularFireAuth,
    public facebook: Facebook, public platform: Platform, private toastCtrl: ToastController, private authService: AuthServiceProvider,
    public fb: FormBuilder, private alertCtrl: AlertController) {
    this.initForm(fb);
    this.user = new User();
    const storedUsername = this.authService.rememberUser();
    if (storedUsername) {
      this.remember = true;
      this.loginForm.controls['email'].setValue(storedUsername);
    }
  }
  ionViewDidLoad() {
  }

  //Botao de login do usuario
  async login(user: User) {
    if (this.response) return;
    this.response = true;
    await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(data => {
        console.log(data.emailVerified);
        if (data.emailVerified) {
          this.authService.setRememberUser(data.email);
          const email = data.email;
          this.email = email.split('@')[0].toUpperCase(0);
          this.navCtrl.push(HomePage, { name: this.email })
        } else {
          this.response = false;
          this.alert('Verifique seu email.');
          this.sendEmailVerification();
        }
      })
      .catch(error => {
        if (error.message == 'The password is invalid or the user does not have a password.') {
          this.alert("Senha invalida");
          this.response = false;
        }

      });

  }
  //Botao de login com Facebook
  facebookLogin() {
    this.facebook.login(['email']).then(res => {
      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {
          this.user.email = success.email;
          this.name = success.displayName;
          this.img = success.photoURL;
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
  sendEmailVerification() {
    var user = this.afAuth.auth.currentUser;
    user.sendEmailVerification().then(() => {
      console.log('enviado');
    })

  }
  send() {
    (<any>window).FirebasePlugin.verifyPhoneNumber(this.number, 60, (credential) => {
      console.log(credential);
      this.verificationId = credential.verificationId;

    }, (error) => {
      console.error(error);
    });
  }

}
