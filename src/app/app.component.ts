import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{title: string, push: boolean, component: any, space: any}>;
  btnName: string = "Edit";
  flag: any = false;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage, space: "original", push: false },
      { title: 'Hello Ionic 1', component: HelloIonicPage, space: "added", push: false },
      { title: 'My First List', component: ListPage, space: null, push: false }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  editClick() {
    if (this.btnName === 'Edit') {
      this.btnName = 'Done';
      this.flag = true;
    } else {
      this.btnName = 'Edit';
      this.flag = false;
    }
  }

  reorderItems(indexes){
    console.log(indexes);
     let element = this.pages[indexes.from];
     this.pages.splice(indexes.from, 1);
     this.pages.splice(indexes.to, 0, element);
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    if (page.push) this.nav.push(page.component, { from: page.sapce });
    else this.nav.setRoot(page.component, { from: page.space });
  }
}
