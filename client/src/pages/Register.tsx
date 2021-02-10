import { IonButton, IonInput, IonItem, IonLabel, IonPage } from "@ionic/react";
import { register } from '../actions/userActions';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';

const Register: React.FC = () => {
    const emailInputRef = useRef<HTMLIonInputElement>(null);
    const passwordInputRef = useRef<HTMLIonInputElement>(null);
    const dispatch = useDispatch();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const email = emailInputRef.current!.value;
        const password = passwordInputRef.current!.value;

        const user = {
          email: String(email),
          password: String(password)
        }
        
      dispatch(register(user));        
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
