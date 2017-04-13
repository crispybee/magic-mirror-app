import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { GridConfigurationPage } from '../gridconfiguration/gridconfiguration';
import {SettingsPage} from '../settings/settings';
import {MapPage} from '../maps/maps';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = SettingsPage;
  tab3Root: any = GridConfigurationPage;
  tab4Root: any = ContactPage;
  tab5Root: any = AboutPage;
  tab6Root: any = MapPage;
  constructor() {

  }
}
