import { AboutPage } from './../pages/about/about';
import { MapComponent } from './../components/map/map';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, NavController, ModalController, MenuController, Nav, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';
import { SplashPage } from '../pages/splash/splash';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = SplashPage;
  @ViewChild(Nav) nav: Nav;
  email: string;
  image: string;
  constructor(platform: Platform, public statusBar: StatusBar, splashScreen: SplashScreen, public afAuth: AngularFireAuth, modalCtrl: ModalController) {
    platform.ready().then(() => {
      const unsubscribe = this.afAuth.auth.onAuthStateChanged((user) => {
        if (user) {
          this.email = user.displayName;
          this.image = user.photoURL;
        } else {
          this.rootPage(LoginPage);
        }
      })
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need
      //splashScreen.hide();
      //let splash = modalCtrl.create(SplashPage);
      //splash.present();
    });
  }
  openPage(p) {
    this.rootPage = p;
  }
  logout() {
    this.afAuth.auth.signOut();
    this.nav.setRoot(LoginPage);
  }

}
