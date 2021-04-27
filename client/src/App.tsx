import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabButton,
  IonTabs,
  IonTabBar,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { home, person, fastFood } from "ionicons/icons";

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

import AddDish from "./pages/AddDish";
import Dish from "./pages/Dish";
import Recipe from "./pages/Recipe";
import Cart from "./pages/Cart";
import Chef from "./pages/Chef";
import Reviews from "./pages/Reviews";
import Orders from "./pages/Orders";
import FavChefs from "./pages/FavChefs";
import Mailbox from "./pages/Mailbox";
import Message from "./pages/Message";
import { updateTab } from "./actions/pathActions";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  const isAuthenticated = useSelector(
    (state: AppState) => state.user.isAuthenticated
  );

  return (
    <IonApp>
      <IonReactRouter>
        {isAuthenticated && <Cart />}
        <IonTabs>
          <IonRouterOutlet id="cart">
            <Route path="/:tab(user)/register" component={Register}></Route>
            <Route path="/:tab(user)/signIn" component={SignIn}></Route>
            <Route path="/:tab(user)/account" component={Account}></Route>
            <Route path="/:tab(user)/reviews" component={Reviews}></Route>
            <Route path="/:tab(user)/orders" component={Orders}></Route>
            <Route path="/:tab(user)/favoriteChefs" component={FavChefs}></Route>
            <Route path="/:tab(user)/chef/:id" component={Chef} exact></Route>
            <Route path="/:tab(user)/page/:id" component={Recipe}></Route>
            <Route path="/:tab(dish)/AddDish" component={AddDish} exact></Route>
            <Route path="/:tab(dish)/allDishes" component={Dish} exact></Route>
            <Route path="/:tab(dish)/page/:id" component={Recipe} exact></Route>
            <Route path="/:tab(dish)/chef/:id" component={Chef} exact></Route>
            <Route path="/Mailbox/:id" component={Mailbox} exact></Route>
            <Route path="/Message/:user" component={Message} exact></Route>
            <Route path="/:tab(user)" exact>
              {isAuthenticated ? (
                <Redirect to="/user/account" />
              ) : (
                <Redirect to="/user/signIn" />
              )}
            </Route>
            <Route path="/:tab(dish)" exact>
              <Redirect to="/dish/allDishes" />
            </Route>
            <Route exact path="/:tab(home)" component={Home} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={home} onClick={() => dispatch(updateTab("home"))}/>
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="dish" href="/dish">
              <IonIcon icon={fastFood} onClick={() => dispatch(updateTab("dish"))}/>
              <IonLabel>Dishes</IonLabel>
            </IonTabButton>
            <IonTabButton tab="account" href="/user">
              <IonIcon icon={person} onClick={() => dispatch(updateTab("user"))}/>
              <IonLabel>Account</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
