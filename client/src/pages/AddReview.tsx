import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import StarRatings from "react-star-ratings";

const AddReview: React.FC = () => {
  const [rating, setRating] = useState<any>(1);

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
        <h1>Reviews</h1>
        <StarRatings
          name="starRating"
          rating={rating}
          starRatedColor="rgb(66,140,255)"
          starHoverColor="rgb(66,140,255)"
          changeRating={(newRating) => setRating(newRating)}
        />
      </IonContent>
    </IonPage>
  );
};

export default AddReview;
