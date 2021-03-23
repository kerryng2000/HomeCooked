import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../reducers";

const Checkout: React.FC<any> = ({ isOpen, onClose }) => {
  const profile = useSelector((state: AppState) => state.user.profile);

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Checkout</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Name</IonLabel>
                  <IonInput
                    type="text"
                    required={true}
                    value={`${profile!.firstName} ${profile!.lastName}`}
                  ></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Address</IonLabel>
                  <IonInput type="text" required={true}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">City</IonLabel>
                  <IonInput type="text" required={true}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">State</IonLabel>
                  <IonInput type="text" required={true}></IonInput>
                </IonItem>
              </IonCol>
              <IonCol>
                  <IonItem>
                      <IonLabel position="floating">Zip code</IonLabel>
                      <IonInput type="number" required={true}></IonInput>
                  </IonItem>
              </IonCol>
            </IonRow>
          </IonGrid>
        </form>
      </IonContent>
    </IonModal>
  );
};

export default Checkout;
