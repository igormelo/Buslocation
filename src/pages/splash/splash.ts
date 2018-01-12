import { SplashScreen } from '@ionic-native/splash-screen';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {
  email: string;
  name: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public splash: SplashScreen, public viewCtrl: ViewController, public afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    this.name = this.navParams.get('name');
    setTimeout(() => {
      this.navCtrl.push(HomePage, { name: this.name });
    }, 1000)
  }

}
