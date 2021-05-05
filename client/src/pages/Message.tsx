import {
  IonButton,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonRow,
  IonCol,
  IonRippleEffect,
  IonTitle
} from "@ionic/react";
import { useRef } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Add } from "../actions/messageActions";
import { useHistory } from "react-router-dom";
import { AppState } from "../reducers";

const Message: React.FC = () => {
const dispatch = useDispatch();
const history = useHistory();
const profile = useSelector((state: AppState) => state.user.profile);
const params = useParams();
const Sender= profile?.email;
const Reciever = params;
const Message = useRef<HTMLIonInputElement>(null);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = Message.current!.value;
   
    const Mail = {
      reciever: String(Reciever['user']),
      sender: String(Sender),
      text: String(body)
    };

    dispatch(Add(Mail, history));
  };
  return (
    <IonPage>
      <IonHeader>
          <IonToolbar className="toolbar-main">
            <IonButtons slot="start">
              <IonBackButton defaultHref=""/>
            </IonButtons>
            <IonTitle>Message</IonTitle>
          </IonToolbar>
        </IonHeader>
      <IonContent>
      <form className="ion-padding" onSubmit={handleSubmit}>
      <IonItem style={{marginTop: '20px'}}>
        <IonLabel position="floating" >What is your Question?</IonLabel>
        <IonInput type="text" ref={Message} ></IonInput>
      </IonItem>
      <IonRow justify-content-center align-items-center>
        <IonCol align-self-center>
            <IonButton
                className="c-login-page__submit"
                type="submit"
                color="primary"
                size="large"
                expand="block"
                shape="round"
                strong
                style={{marginTop: '20px'}}
            >
                Send
                <IonRippleEffect></IonRippleEffect>
            </IonButton>
        </IonCol>
    </IonRow>
    </form>
      </IonContent>
    </IonPage>
  );

};
export default Message;

