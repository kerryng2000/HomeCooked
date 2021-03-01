import { IonButton, IonInput, IonItem, IonLabel, IonPage } from "@ionic/react";
import { signIn } from '../actions/userActions';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { IonRouterLink } from "@ionic/react";

const SignIn: React.FC = () => {
    const emailInputRef = useRef<HTMLIonInputElement>(null);
    const passwordInputRef = useRef<HTMLIonInputElement>(null);
    const dispatch = useDispatch();
    const history = useHistory();

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
        <IonButton className="ion-margin-top" type="submit">Sign in</IonButton>
        <IonRouterLink routerLink="/user/register">Don't have an account? Register here</IonRouterLink>
      </form>
    </IonPage>
  );
};

export default SignIn;
