import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';

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
  user = {} as User
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAth: AngularFireAuth, private alertCtrl: AlertController) {
  }
  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }
  register(user: User) {

    this.afAth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(data => {
        this.alert('Registrado!');
      })
      .catch(error => {
        this.alert(error.message);
      });
  }

}
