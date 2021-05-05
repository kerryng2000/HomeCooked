import {
  IonAvatar,
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonRow,
  IonCol,
  IonRippleEffect,
} from "@ionic/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut, updateProfPic } from "../actions/userActions";
import { AppState } from "../reducers";
import { useHistory } from "react-router-dom";
import { Camera, CameraResultType } from "@capacitor/core";
import { decode } from "base64-arraybuffer";
import { cartOutline, heartOutline, mailOutline, starOutline } from "ionicons/icons";

const Account: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const profile = useSelector((state: AppState) => state.user.profile);

  const handleSignOut = () => {
    dispatch(signOut(history));
  };

  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });

    const blob = new Blob([new Uint8Array(decode(image.base64String!))], {
      type: `image/${image.format}`,
    });

    dispatch(updateProfPic(blob, image.format));
  };

  const profPicStyle = {
      margin: "0 auto",
      width: "150px",
      height: "150px"
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolbar-main">
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1 className="ion-margin-bottom">Welcome {profile!.firstName}</h1>
        <IonAvatar onClick={takePhoto} style={profPicStyle}>
          <IonImg src={`/${profile!.profilePicture}`}></IonImg>
        </IonAvatar>
        <IonList className="ion-margin-top">
          <IonItem onClick={() => history.push("/user/favoritechefs")}>
            <IonIcon icon={heartOutline}/>
            <IonLabel className="ion-margin account">Favorite chefs</IonLabel>
          </IonItem>
          <IonItem onClick={() => history.push("/user/reviews")}>
            <IonIcon icon={starOutline}/>
            <IonLabel className="ion-margin account">Reviews</IonLabel>
          </IonItem>
          <IonItem onClick={() => history.push("/user/orders")}>
            <IonIcon icon={cartOutline}/>
            <IonLabel className="ion-margin account">Orders</IonLabel>
          </IonItem>
          <IonItem onClick={() => history.push(`/user/Mailbox/${profile!.email}`)}>
          <IonIcon icon={mailOutline}/>
          <IonLabel className="ion-margin account">Mailbox</IonLabel>
        </IonItem>
        </IonList>
        <IonRow justify-content-center align-items-center>
          <IonCol align-self-center>
              <IonButton
                  className="c-login-page__submit"
                  onClick={handleSignOut}
                  type="submit"
                  color="primary"
                  size="large"
                  expand="block"
                  shape="round"
                  style={{marginTop: '20px'}}
                  strong
              >
                  Sign Out
                  <IonRippleEffect></IonRippleEffect>
              </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
      
    </IonPage>
  );
};

export default Account;
