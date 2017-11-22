import { RegisterPage } from './../pages/register/register';
import { Facebook } from '@ionic-native/facebook';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { AngularFireModule } from 'angularfire2';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps } from '@ionic-native/google-maps';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

const firebaseConfig = {
  apiKey: "AIzaSyA_PvFDFNxXV4gnBxGJwEOVkHU597rPC8M",
  authDomain: "testez-fbf7b.firebaseapp.com",
  databaseURL: "https://testez-fbf7b.firebaseio.com",
  projectId: "testez-fbf7b",
  storageBucket: "testez-fbf7b.appspot.com",
  messagingSenderId: "327150452559"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage

  ],
  imports: [
    HttpModule,
    BrowserModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    AboutPage,
    ContactPage,
    HomePage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Facebook,
    AngularFireAuth,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider
  ]
})
export class AppModule { }
