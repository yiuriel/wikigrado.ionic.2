import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProfilePage } from '../../pages/user-profile/user-profile'
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: '[customheader]',
  templateUrl: 'custom-header.html'
})
export class CustomHeaderComponent {

  @Input('header-title') headerTitle;
  @Input('remove-header-icon') removeHeaderIcon;

  text: string;
  avatars: any;
  avatar: any;
  username: any;

  constructor(public navCtrl: NavController, public userService: UserProvider) {
    console.log('Hello CustomHeaderComponent Component');
    this.avatars = ['assets/imgs/avatar/1.png','assets/imgs/avatar/2.png','assets/imgs/avatar/3.png','assets/imgs/avatar/4.png','assets/imgs/avatar/5.png','assets/imgs/avatar/6.png','assets/imgs/avatar/7.png','assets/imgs/avatar/8.png','assets/imgs/avatar/9.png','assets/imgs/avatar/10.png','assets/imgs/avatar/11.png'];

    this.userService.getUserData((data, error) => {
      if (!error) {
        this.avatar = data.avatar;
        this.username = data.first_name;
      }
    });
  }

  goToUserProfile() {
    this.navCtrl.setRoot(UserProfilePage, {}, {animate: true});
  }

}
