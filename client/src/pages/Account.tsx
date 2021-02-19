import { IonButton, IonCard, IonImg, IonPage } from "@ionic/react"
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../actions/userActions";
import { AppState } from "../reducers";

const Account: React.FC = () => {
    const dispatch = useDispatch();
    
    const profile = useSelector((state: AppState) => state.user.profile);

    const handleSignOut = () => {
        dispatch(signOut())
    }

    return (
        <IonPage>
            <h1>Welcome {profile!.firstName}</h1>
            <IonCard>
            <IonImg src={`../../../${profile!.profilePicture}`}></IonImg>
            </IonCard>
            <IonButton onClick={handleSignOut}>Sign out</IonButton>
        </IonPage>
    )
}

export default Account;