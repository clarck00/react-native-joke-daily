import { NavigationActions } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';

let _navigator: any;

function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}

function navigate(routeName: any, params: any) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

const closeDrawer = () => {
  _navigator.dispatch(DrawerActions.closeDrawer())
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  closeDrawer
};