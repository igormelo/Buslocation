import { MapComponent } from './../components/map/map';
import { SplashPage } from './../pages/splash/splash';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, NavController, ModalController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  @ViewChild('nav') navCtrl: NavController;
  email: string;
  isLogged: boolean;
  initLat: number;
  initLng: number;
  constructor(platform: Platform, public statusBar: StatusBar, splashScreen: SplashScreen, public afAuth: AngularFireAuth, modalCtrl: ModalController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need
      splashScreen.hide();
      const unsubscribe = this.afAuth.auth.onAuthStateChanged((user) => {
        const verify = this.afAuth.auth.currentUser;
        if (user) {
          console.log(user);
          this.navCtrl.setRoot(HomePage, { name: user.displayName, img: user.photoURL });
          unsubscribe();
        } else {
          this.rootPage = LoginPage;
        }
      })
    });
  }

}
