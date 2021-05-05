import {
  IonAvatar,
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonToolbar,
  IonTitle
} from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import StarRatings from "react-star-ratings";
import { AppState } from "../reducers";

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const userId = useSelector((state: AppState) => state.user.profile!._id)
  const history = useHistory();

  useEffect(() => {
    axios.get(`/reviews/${userId}`)
    .then(res => setReviews(res.data))
    .catch(err => console.log(err))
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolbar-main">
          <IonButtons slot="start">
            <IonBackButton defaultHref="" />
          </IonButtons>
          <IonTitle>Reviews</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonList>
        {reviews.map((review) => {
          return (
            <IonItem key={review._id}>
              <IonGrid >
                <IonRow>
                  <IonCol>
                    <IonAvatar onClick={() => history.push(`/user/chef/${review.user._id}`)}>
                      <IonImg
                        src={`/${review.user.profilePicture}`}
                      />
                    </IonAvatar>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    {review.user.firstName}{" "}
                    {review.user.lastName.substr(0, 1)}.
                  </IonCol>
                </IonRow>
              </IonGrid>
              <IonGrid>
                <IonRow>
                  <IonCol pull="7">
                    <StarRatings
                      starDimension="15px"
                      rating={review["rating"]}
                      starRatedColor="yellow"
                    />
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol pull="7">
                    {review.description}
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
          );
        })}
      </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Reviews;
