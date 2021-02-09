import { IonButton, IonInput, IonItem, IonLabel, IonPage } from "@ionic/react";
import { register } from '../actions/userActions';
import userInterface from '../interfaces/userInterface';
import { useState, useRef } from 'react';

const Register: React.FC = () => {
    const emailInputRef = useRef<HTMLIonInputElement>(null);
    const passwordInputRef = useRef<HTMLIonInputElement>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("hello");

        const email = emailInputRef.current!.value;
        const password = passwordInputRef.current!.value;

        const user = {
          email: String(email),
          password: String(password)
        }

        register(user);
    }
  
    return (
    <IonPage>
      <form className="ion-padding" onSubmit={ handleSubmit }>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput type="email" ref={ emailInputRef }></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" ref={ passwordInputRef }></IonInput>
        </IonItem>
        <IonButton className="ion-margin-top" type="submit">Create account</IonButton>
      </form>

    </IonPage>
  );
};

export default Register;
