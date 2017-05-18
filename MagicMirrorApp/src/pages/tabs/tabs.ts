import {Component} from '@angular/core';

import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {SettingsPage} from '../settings/settings';
import {MirrorSurfacePage} from '../mirror-surface/mirror-surface';
import {MapPage} from '../maps/maps';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = SettingsPage;
  tab3Root: any = ContactPage;
  // tab4Root: any = MapPage;
  tab5Root: any = MirrorSurfacePage;
  tab6Root: any = AboutPage;

  constructor() {

  }
}
