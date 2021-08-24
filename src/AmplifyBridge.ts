import { Auth, Hub } from 'aws-amplify';
import { deleteProfile, updateProfile, switchUser } from "./actions";

export default class AmplifyBridge {
  store: any;
  constructor(store: any) {
    this.store = store;
    Hub.listen('auth', (data) => {
      const { payload } = data;
      this.onAuthEvent(payload);
    })
  }

  onAuthEvent(payload: any) {
    console.log('payload is ', payload)
    this.checkUser()
  }
  checkUser() {
    Auth.currentAuthenticatedUser()
      .then(user => this.checkUserSuccess(user))
      .catch(err => this.checkUserError(err));
  }

  loadUserInfo(user) {
    Auth.currentUserInfo()
      .then(info => this.loadUserInfoSuccess(user, info))
      .catch(err => this.loadUserInfoError(user, err));
  }

  loadProfile(user) {
    Auth.userAttributes(user)
      .then(data => this.loadProfileSuccess(data))
      .catch(err => this.loadProfileError(err));
  }

  checkUserSuccess(user) {
    console.log('check user success', user);
    this.loadUserInfo(user); // Defer store.dispatch to loadUserInfo
    this.loadProfile(user);
  }

  checkUserError(err) {
    console.log('check user error', err);
    this.store.dispatch(switchUser(null));
    this.store.dispatch(deleteProfile());
  }

  loadUserInfoSuccess(user, info) {
    console.log('load user info success', user, info);
    Object.assign(user, info);
    this.store.dispatch(switchUser(user));
  }

  loadUserInfoError(user, err) {
    console.log('load user info error', err);
    this.store.dispatch(switchUser(user)); // Still dispatchs user object
  }

  loadProfileSuccess(data) {
    console.log('load profile success', data);
    const profile = this.translateAttributes(data);
    this.store.dispatch(updateProfile(profile));
  }

  loadProfileError(err) {
    console.log('load profile error', err);
    this.store.dispatch(deleteProfile());
  }

  // Auth.userAttributes returns an array of attributes.
  // We map it to an object for easy use.

  // Auth.userAttributes returns an array of attributes.
  // We map it to an object for easy use.
  translateAttributes(data: { forEach: (arg0: (attr: any) => any) => void; }) {
    const attributes = {};
    data
      .forEach(attr => attributes[attr.Name] = attr.Value);
    return attributes;
  }
}
