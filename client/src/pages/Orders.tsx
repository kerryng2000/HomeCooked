import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
  } from "@ionic/react";
  import React from "react";
  
  const Orders: React.FC = () => {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar className="ion-padding-top">
            <IonButtons slot="start">
              <IonBackButton defaultHref="" />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <h1>Orders</h1>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Orders;
  