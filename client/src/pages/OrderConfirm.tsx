import { IonContent, IonModal } from "@ionic/react";
import React from "react";

const OrderConfirm: React.FC<any> = ({ isOpen, onClose }) => {

    return (
      <IonModal isOpen={isOpen}>
        <IonContent>
          <h1>Order confirm</h1>
        </IonContent>
      </IonModal>
    );
  };
  
  export default OrderConfirm;