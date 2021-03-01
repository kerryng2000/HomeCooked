import { Redirect, Route } from "react-router-dom";
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabButton, IonTabs, IonTabBar } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { home, person } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { checkAuth } from "./actions/userActions";
import SignIn from "./pages/SignIn";
import { AppState } from "./reducers";
import Account from "./pages/Account";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
    console.log('check')
  }, []);

  const isAuthenticated = useSelector((state: AppState) => state.user.isAuthenticated);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/:tab(user)/register" component={Register}></Route>
            <Route path="/:tab(user)/signIn" component={SignIn}></Route>
            <Route path="/:tab(user)/account" component={Account}></Route>
            <Route path="/:tab(user)" exact>
              {isAuthenticated ? <Redirect to="/user/account"/> : <Redirect to="/user/signIn"/>}
            </Route>
            <Route exact path="/:tab(home)" component={Home}/>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
         
          <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/home">
                    <IonIcon icon={ home } />
                    <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="account" href="/user">
                    <IonIcon icon={ person } />
                    <IonLabel>Account</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};


export default App;
