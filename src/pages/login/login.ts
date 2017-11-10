import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
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
  email: any;
  name: any;
  img: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public facebook: Facebook, public platform: Platform, private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    /*let provider = new firebase.auth.FacebookAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then((res) => {
      this.navCtrl.push(TabsPage);
    })*/
  }
  /*login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.loginData.email, this.loginData.password)
      .then(auth => {
        // Do custom things with auth
      })
      .catch(err => {
        // Handle error
        let toast = this.toastCtrl.create({
          message: err.message,
          duration: 1000
        });
        toast.present();
      });
  }*/

  facebookLogin() {
    this.facebook.login(['email']).then(res => {
      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      firebase.auth().signInWithCredential(facebookCredential)
        .then((sucess) => {
          this.email = sucess.email;
          this.name = sucess.displayName;
          this.img = sucess.photoURL;
          this.navCtrl.setRoot(HomePage, { name: this.name, photoURL: this.img });
        })
    })
  }


}
