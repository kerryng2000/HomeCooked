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
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51IXyYgFh9O3K0dbjc5hSwDk3NOYvjWzyqsCtPf5kFJay1Ak8BLssWNr6ssUigyW3atY5WqmtzilXTHBn4cF8O90D00J0XWz5VX"
);

const stripeStyle = {
  style: {
    base: {
      backgroundColor: "#000000",
      color: "#FFFFFF",
      fontSize: "18px",
      borderStyle: "solid",
      borderBottomWidth: "10px",
      borderBottomColor: "red",
    },
  },
};

const borderStyle = {
  borderBottom: "1px solid #222222",
};

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
            <Elements stripe={stripePromise}>
              <IonRow className="ion-padding">
                <IonCol>
                  <IonLabel position="floating">Card number</IonLabel>
                  <div style={borderStyle}>
                    <CardNumberElement options={stripeStyle} />
                  </div>
                </IonCol>
              </IonRow>
              <IonRow className="ion-padding">
                <IonCol>
                  <IonLabel position="floating">Expiration date</IonLabel>
                  <div style={borderStyle}>
                    <CardExpiryElement options={stripeStyle} />
                  </div>
                </IonCol>
                <IonCol>
                  <IonLabel position="floating">CVC</IonLabel>
                  <div style={borderStyle}>
                    <CardCvcElement options={stripeStyle} />
                  </div>
                </IonCol>
              </IonRow>
            </Elements>
          </IonGrid>
        </form>
      </IonContent>
    </IonModal>
  );
};

export default Checkout;
