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
import React, { useRef, useState } from "react";
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
import axios from "axios";
import { useHistory } from "react-router";

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

const CheckoutForm = () => {
  const profile = useSelector((state: AppState) => state.user.profile);
  const stripe = useStripe();
  const elements = useElements();
  const items = useSelector((state: AppState) => state.cart.items);
  const street_address = useRef<HTMLIonInputElement>(null);
  const city = useRef<HTMLIonInputElement>(null);
  const state = useRef<HTMLIonInputElement>(null);
  const zip_code = useRef<HTMLIonInputElement>(null);
  const [orderComplete, setOrderComplete] = useState(false);
  const total = useSelector((state: AppState) => state.cart.total);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe!.createPaymentMethod({
      type: "card",
      card: elements!.getElement(CardNumberElement)!
    })

    if (!error)
    {
      const order = {
        id: paymentMethod!.id,
        address: {
          street: street_address.current!.value,
          city: city.current!.value,
          state: state.current!.value,
          zip_code: zip_code.current!.value
        },
        items: items
      }

      axios.post("/orders", order)
      .then(res => {
        console.log(res)
        setOrderComplete(true);
      })
      .catch(error => console.log(error))
    }

  }
  
  return (
    <div>
    {orderComplete ? <h1 className="ion-margin">Thank you, your order with a total of ${total} has been completed.</h1> : (
      <form onSubmit={ handleSubmit }>
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
              <IonInput ref={street_address} type="text" required={true}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">City</IonLabel>
              <IonInput ref={city} type="text" required={true}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">State</IonLabel>
              <IonInput ref={state} type="text" required={true}></IonInput>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Zip code</IonLabel>
              <IonInput ref={zip_code} type="number" required={true}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>

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
            <IonLabel position="floating">Security code</IonLabel>
            <div style={borderStyle}>
              <CardCvcElement options={stripeStyle} />
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
      <IonButton type="submit" disabled={!stripe} className="ion-margin">Place order</IonButton>
    </form>
    )}
    </div>
  );
};

const Checkout: React.FC<any> = ({ isOpen, onClose }) => {
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
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </IonContent>
    </IonModal>
  );
};

export default Checkout;
