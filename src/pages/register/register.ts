import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  registerForm: FormGroup;
  user = {} as User
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private afAuth: AngularFireAuth, private alertCtrl: AlertController, public fb: FormBuilder) {
    this.user = new User();
    this.initForm(fb);
  }

  register(user: User) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(data => {
        this.alert('Registrado com sucesso!', 'Registrado');
        this.sendEmailVerification();
        this.navCtrl.setRoot(HomePage, { name: data.email.split('@')[0].toUpperCase() });
      })
      .catch(error => {
        if (error.message == 'The email address is already in use by another account.') {
          this.alert('Nome de usuário ja cadastrado', 'Erro ao registrar');
        }
      });
  }

  initForm(fb: FormBuilder) {
    this.registerForm = fb.group({
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
    if (!this.registerForm.valid) return;
    this.user = new User(value.email, value.password);
    this.register(value);
  }
  alert(message: string, title: string) {
    this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    }).present();
  }
  sendEmailVerification() {
    var user = this.afAuth.auth.currentUser;
    user.sendEmailVerification().then(() => {
      console.log('enviado');
    })

  }


}
