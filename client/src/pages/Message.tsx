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
  } from "@ionic/react";
  import { useRef } from "react";
  import React, { useState, useEffect} from "react";
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
  console.log(Reciever['user']);
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
            <IonToolbar className="ion-padding-top">
              <IonButtons slot="start">
                <IonBackButton defaultHref=""/>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
        <IonContent>
        <form className="ion-padding" onSubmit={handleSubmit}>
        <IonItem>
          <IonLabel position="floating">What is your Question?</IonLabel>
          <IonInput type="text" ref={Message}></IonInput>
        </IonItem>
        <IonButton className="ion-margin-top" type="submit">
          Send
        </IonButton>
      </form>
        </IonContent>
      </IonPage>
    );

  };
  export default Message;
  