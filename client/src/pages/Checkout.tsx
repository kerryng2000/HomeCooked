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
  IonRippleEffect,
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

const stripePromise = loadStripe(
  "pk_test_51IXyYgFh9O3K0dbjc5hSwDk3NOYvjWzyqsCtPf5kFJay1Ak8BLssWNr6ssUigyW3atY5WqmtzilXTHBn4cF8O90D00J0XWz5VX"
);

const stripeStyle = {
  style: {
    base: {
      backgroundColor: "white",
      color: "black",
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

      axios.post(`/orders`, order)
      .then(res => {
        setOrderComplete(true);
      })
      .catch(error => console.log(error))
    }
  }
  
  return (
    <div style={{marginTop: '50px'}}>
    {orderComplete ? <h1 className="ion-margin">Thank you, your order with a total of ${total} has been completed.</h1> : (
    <form onSubmit={ handleSubmit }>
      <IonGrid>
        <IonRow justify-content-center align-items-center className="form-row register">
          <IonCol align-self-center>
              <IonItem>
                  <IonLabel position="floating" >Name:</IonLabel>
                  <IonInput
                      
                      value={`${profile!.firstName} ${profile!.lastName}`}
                      required
                  />
              </IonItem>
          </IonCol>
        </IonRow>
        <IonRow justify-content-center align-items-center className="form-row register">
          <IonCol align-self-center>
              <IonItem>
                  <IonLabel position="floating" >Address:</IonLabel>
                  <IonInput
                      
                      ref={street_address}
                      required
                  />
              </IonItem>
          </IonCol>
        </IonRow>
        <IonRow justify-content-center align-items-center className="form-row register">
          <IonCol align-self-center>
              <IonItem>
                  <IonLabel position="floating" >City:</IonLabel>
                  <IonInput
                      
                      ref={city}
                      required
                  />
              </IonItem>
          </IonCol>
        </IonRow>
        <IonRow justify-content-center align-items-center className="form-row register">
          <IonCol>
            <IonItem>
              <IonLabel position="floating" >State:</IonLabel>
              <IonInput ref={state} type="text" required={true} ></IonInput>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem>
              <IonLabel position="floating" >Zip code:</IonLabel>
              <IonInput ref={zip_code} type="number" required={true} ></IonInput>
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
      <IonRow justify-content-center align-items-center>
          <IonCol align-self-center>
              <IonButton
                  className="c-login-page__submit"
                  type="submit"
                  color="primary"
                  size="large"
                  expand="block"
                  shape="round"
                  disabled={!stripe}
                  strong
              >
                  Place order
                  <IonRippleEffect></IonRippleEffect>
              </IonButton>
          </IonCol>
      </IonRow>
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
