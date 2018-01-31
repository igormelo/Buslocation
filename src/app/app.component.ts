import { Facebook } from '@ionic-native/facebook';
import { Events } from 'ionic-angular';
import { LoginPage } from './../pages/login/login';
import { window } from 'rxjs/operator/window';
import { HomePage } from './../pages/home/home';
import { SplashPage } from './../pages/splash/splash';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AboutPage } from './../pages/about/about';
import { MapComponent } from './../components/map/map';
import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, NavController, ModalController, MenuController, Nav, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireAuth } from 'angularfire2/auth';
import { Network } from '@ionic-native/network';


declare var navigator: any;
declare var Connection: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  @ViewChild(Nav) nav: Nav;
  email: string;
  image: string;
  isConnected: boolean;
  text: string;
  constructor(platform: Platform, public statusBar: StatusBar, public afAuth: AngularFireAuth, modalCtrl: ModalController, public splashScreen: SplashScreen, public facebook: Facebook, public events: Events) {
    platform.ready().then(() => {
      this.splashScreen.hide();
      this.statusBar.overlaysWebView(true);
      this.statusBar.styleDefault();
      /*const unsubscribe = this.afAuth.auth.onAuthStateChanged((user) => {
        if (user) {
          this.isConnected = true;
          if (this.isConnected === true) {
            this.text = "Conectado";
            this.email = user.displayName;
            this.image = user.photoURL;
          }
          this.nav.setRoot(HomePage, { name: user.displayName, img: user.photoURL });
        } else {
          this.isConnected = false;
          if (!this.isConnected) {
            this.text = "Desconectado";
          }
          this.nav.setRoot(HomePage, { name: 'de volta!' });
        }
      })*/
    });
  }


  logout() {
    this.afAuth.auth.signOut();
  }
  facebookLogin() {
    this.facebook.login(['email', 'public_profile', 'user_friends']).then(res => {
      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
      firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {
          this.image = success.photoURL;
          this.nav.push(HomePage, { name: success.displayName, image: this.image })
        });
    });
  }

}
