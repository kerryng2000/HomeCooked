import { IonButton, IonInput, IonItem, IonLabel, IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton } from "@ionic/react";
import { register } from "../actions/userActions";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Register: React.FC = () => {
  const emailInputRef = useRef<HTMLIonInputElement>(null);
  const passwordInputRef = useRef<HTMLIonInputElement>(null);
  const firstNameInputRef = useRef<HTMLIonInputElement>(null);
  const lastNameInputRef = useRef<HTMLIonInputElement>(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;
    const firstName = firstNameInputRef.current!.value;
    const lastName = lastNameInputRef.current!.value;

    const user = {
      firstName: String(firstName),
      lastName: String(lastName),
      email: String(email),
      password: String(password),
    };

    dispatch(register(user, history));
  };

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref=""/>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      <form className="ion-padding" onSubmit={handleSubmit}>
        <IonItem>
          <IonLabel position="floating">First Name</IonLabel>
          <IonInput
            type="text"
            ref={firstNameInputRef}
            required={true}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Last Name</IonLabel>
          <IonInput
            type="text"
            ref={lastNameInputRef}
            required={true}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput type="email" ref={emailInputRef} required={true}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            ref={passwordInputRef}
            minlength={5}
            required={true}
          ></IonInput>
        </IonItem>
        <IonButton className="ion-margin-top" type="submit">
          Create account
        </IonButton>
      </form>
      </IonContent>
    </IonPage>
  );
};

export default Register;
