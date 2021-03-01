import { IonAvatar, IonButton, IonContent, IonImg, IonItem, IonLabel, IonList, IonPage } from "@ionic/react"
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut, updateProfPic } from "../actions/userActions";
import { AppState } from "../reducers";
import { useHistory } from 'react-router-dom';
import { Camera, CameraResultType } from "@capacitor/core";
import { decode } from "base64-arraybuffer";


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
            resultType: CameraResultType.Base64
        });

        const blob = new Blob([new Uint8Array(decode(image.base64String!))], 
            { type: `image/${image.format}`})

        dispatch(updateProfPic(blob, image.format))
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