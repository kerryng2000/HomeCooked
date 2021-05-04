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
  IonBackButton
} from "@ionic/react";
import { register } from "../actions/userActions";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setErrorMessage } from "../actions/userActions";
import { AppState } from "../reducers";

const Register: React.FC = () => {
  const emailInputRef = useRef<HTMLIonInputElement>(null);
  const passwordInputRef = useRef<HTMLIonInputElement>(null);
  const firstNameInputRef = useRef<HTMLIonInputElement>(null);
  const lastNameInputRef = useRef<HTMLIonInputElement>(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const showError = useSelector((state: AppState) => state.user.showError);
  const errorMessage = useSelector((state: AppState) => state.user.errorMessage);

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

  const closeToast = () => {
    dispatch(setErrorMessage(false, ''));
  }

  return (
    <IonPage className="c-login-page">
        <IonHeader>
          <IonToolbar className="toolbar-main">
            <IonButtons slot="start">
                <IonBackButton defaultHref="" />
            </IonButtons>
            <IonTitle>SignUp</IonTitle>
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

                    <IonRow justify-content-center align-items-center className="form-row register">
                        <IonCol align-self-center>
                            <IonItem>
                                <IonLabel position="floating" >First Name:</IonLabel>
                                <IonInput
                                    
                                    ref={ firstNameInputRef }
                                    required
                                />
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow justify-content-center align-items-center className="form-row register">
                        <IonCol align-self-center>
                            <IonItem>
                                <IonLabel position="floating" >Last Name:</IonLabel>
                                <IonInput
                                    
                                    ref={ lastNameInputRef }
                                    required
                                />
                            </IonItem>
                        </IonCol>
                    </IonRow>

                    <IonRow justify-content-center align-items-center className="form-row register">
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

                    <IonRow justify-content-center align-items-center className="form-row register">
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
          </IonContent>
      </IonPage>
  );
};

export default Register;
