import { IonButton, IonPage } from "@ionic/react"
import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../actions/userActions";

const Account: React.FC = () => {
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(signOut())
    }

    return (
        <IonPage>
            <h1>My Account</h1>
            <IonButton onClick={handleSignOut}>Sign out</IonButton>
        </IonPage>
    )
}

export default Account;