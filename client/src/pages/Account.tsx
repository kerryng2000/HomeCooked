import { IonAvatar, IonButton, IonContent, IonImg, IonItem, IonLabel, IonList, IonPage } from "@ionic/react"
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../actions/userActions";
import { AppState } from "../reducers";
import { useHistory } from 'react-router-dom';
import { Camera, CameraResultType } from "@capacitor/core";


const Account: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const profile = useSelector((state: AppState) => state.user.profile);

    const handleSignOut = () => {
        dispatch(signOut(history))
    }

    const takePhoto = async () => {
        const image = await Camera.getPhoto({
            quality: 100,
            allowEditing: false,
            resultType: CameraResultType.Uri
        });

        console.log(image);
    }

    return (
        <IonPage>
            <h1>Welcome {profile!.firstName}</h1>
            <IonAvatar onClick={takePhoto}>
            <IonImg src={`../../../${profile!.profilePicture}`}></IonImg>
            </IonAvatar>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel>Edit account</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>View orders</IonLabel>
                    </IonItem>
                </IonList>
            </IonContent>
            <IonButton onClick={handleSignOut}>Sign out</IonButton>
        </IonPage>
    )
}

export default Account;