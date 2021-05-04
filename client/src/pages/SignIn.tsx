import {
  IonButton,
  IonContent,
  IonPage,
  IonRow,
  IonToast,
  IonGrid,
  IonCol,
  IonInput,
  IonItem,
  IonLabel,
  IonRippleEffect,
  IonImg,
  IonToolbar,
  IonTitle,
  IonHeader,
  IonRouterLink,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import React from "react";

import { signIn } from '../actions/userActions';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setErrorMessage } from "../actions/userActions";
import { AppState } from "../reducers";

const SignIn = () => {
const emailInputRef = useRef<HTMLIonInputElement>(null);
const passwordInputRef = useRef<HTMLIonInputElement>(null);
const dispatch = useDispatch();
const history = useHistory();
const showError = useSelector((state: AppState) => state.user.showError);
const errorMessage = useSelector((state: AppState) => state.user.errorMessage);

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;

    const user = {
      email: String(email),
      password: String(password)
    }
    
  dispatch(signIn(user, history));       
}

const closeToast = () => {
  dispatch(setErrorMessage(false, ''));
}

return (
    <IonPage className="c-login-page">
      <IonHeader>
        <IonToolbar className="toolbar-main">
          <IonTitle>Sign In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
          <IonToast
              isOpen={showError}
              onDidDismiss={closeToast}
              message={errorMessage}
              duration={2000}
              cssClass="toast-message"
          />
          <form onSubmit={handleSubmit} autoComplete="off">
              <IonGrid>
                  <IonRow justify-content-center align-items-center>
                      <IonCol />
                      <IonCol align-self-center size="5">
                          <IonImg src="assets/img/auth/auth-logo.svg" />
                      </IonCol>
                      <IonCol />
                  </IonRow>

                  <IonRow justify-content-center align-items-center className="form-row">
                      <IonCol align-self-center>
                          <IonItem>
                              <IonLabel position="floating" >Email:</IonLabel>
                              <IonInput
                                  type="email"
                                  name="email"
                                  
                                  ref={ emailInputRef }
                                  required
                              />
                          </IonItem>
                      </IonCol>
                  </IonRow>

                  <IonRow justify-content-center align-items-center className="form-row">
                      <IonCol align-self-center>
                          <IonItem>
                              <IonLabel position="floating" >Password:</IonLabel>
                              <IonInput
                                  type="password"
                                  
                                  ref={ passwordInputRef }
                                  required
                              />
                          </IonItem>
                      </IonCol>
                  </IonRow>

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
                          >
                              submit
                              <IonRippleEffect></IonRippleEffect>
                          </IonButton>
                      </IonCol>
                  </IonRow>
              </IonGrid>
          </form>
          <IonRow className="switch-auth">
            Don't have an account?&nbsp;
            <span>
              <IonRouterLink routerLink="/user/register">Register</IonRouterLink>
            </span>
          </IonRow>
        </IonContent>
    </IonPage>
);
};

export default SignIn;
