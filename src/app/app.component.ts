import { SplashPage } from './../pages/splash/splash';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AboutPage } from './../pages/about/about';
import { MapComponent } from './../components/map/map';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, NavController, ModalController, MenuController, Nav, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { HomePage } from '../pages/home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  @ViewChild(Nav) nav: Nav;
  email: string;
  image: string;
  constructor(platform: Platform, public statusBar: StatusBar, public afAuth: AngularFireAuth, modalCtrl: ModalController, public splashScreen: SplashScreen) {
    platform.ready().then(() => {
      this.splashScreen.hide();
      this.statusBar.overlaysWebView(true);
      this.statusBar.styleDefault();

      const unsubscribe = this.afAuth.auth.onAuthStateChanged((user) => {
        if (user) {
          this.email = user.displayName;
          this.image = user.photoURL;
          this.nav.setRoot(HomePage, { name: user.displayName, img: user.photoURL });
        } else {
          this.nav.setRoot(HomePage);
        }
      })
    });
  }
  logout() {
    this.afAuth.auth.signOut();
    this.nav.setRoot(LoginPage);
  }

}
