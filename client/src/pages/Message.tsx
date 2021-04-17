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
import { useDispatch } from "react-redux";
import { Add } from "../actions/messageActions";
import { useHistory } from "react-router-dom";
  
  const Message: React.FC = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    
    const Sender= useRef<HTMLIonInputElement>(null);
    const Reciever = useRef<HTMLIonInputElement>(null);
    const Message = useRef<HTMLIonInputElement>(null);

  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      const reciever = Reciever.current!.value;
      const sender = Sender.current!.value;
      const body = Message.current!.value;
     
      const Mail = {
        reciever: String(reciever),
        sender: String(sender),
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
          <IonLabel position="floating">Reciever?</IonLabel>
          <IonInput type="text" ref={Reciever}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Your Name?</IonLabel>
          <IonInput type="text" ref={Sender}></IonInput>
        </IonItem>
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
  