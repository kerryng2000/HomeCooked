import { IonIcon, IonLabel, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton } from "@ionic/react";
import { home, person } from 'ionicons/icons';
import { Route } from "react-router";
import Home from '../pages/Home';
import Register from "../pages/Register";

const TabBar: React.FC = () => {
    return (
        <IonTabs>
            <IonRouterOutlet>
                <Route path="/home" component={ Home } exact></Route>
                <Route path="/register" component={ Register } exact></Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/home">
                    <IonIcon icon={ home } />
                    <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="account" href="/register">
                    <IonIcon icon={ person } />
                    <IonLabel>Account</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}

export default TabBar;