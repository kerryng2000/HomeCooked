import { IonHeader, IonRouterLink, IonToolbar } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../actions/userActions";
import { AppState } from "../reducers";

const Navbar: React.FC = () => {
    const {isAuthenticated} = useSelector((state: AppState) => state.user);
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(signOut())
    }
    
    return (
        <IonHeader>
            <IonToolbar>
            { isAuthenticated ? 
                <IonRouterLink onClick={handleSignOut}>Sign out</IonRouterLink> :
                <ul>
                    <IonRouterLink href="/register">Sign up</IonRouterLink>
                    <IonRouterLink href="/signIn">Sign in</IonRouterLink>
                </ul>
            }

            </IonToolbar>
        </IonHeader>
    )
}

export default Navbar;