import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";
import { addCircleOutline, chevronForwardOutline } from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { AppState } from "../reducers";
import StarRatings from "react-star-ratings";

const Chef: React.FC = () => {
  const params: any = useParams();
  const [chef, setChef] = useState<any>({});
  const [dishes, setDishes] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [selected, setSelected] = useState<String>("dishes");
  const history = useHistory();
  const isAuthenticated = useSelector(
    (state: AppState) => state.user.isAuthenticated
  );
  const email = useSelector((state: AppState) => state.user.profile!.email);
  const [rating, setRating] = useState<any>(1);
  const descInputRef = useRef<HTMLIonTextareaElement>(null);

  const requestChef = axios.get(`/users/${params.id}`);
  const requestDishes = axios.get(`/users/dishes/${params.id}`);
  const requestReviews = axios.get(`reviews/${params.id}`);

  useEffect(() => {
    axios.all([requestChef, requestDishes, requestReviews]).then(
      axios.spread((...responses) => {
        setChef(responses[0].data);
        setDishes(responses[1].data);
        setReviews(responses[2].data);
        console.log(responses[2].data);
      })
    );
  }, []);

  const handleSubmit = () => {
    const description = descInputRef.current!.value;

    const review = {
      chef: params.id,
      rating: rating,
      description: description,
    };

    axios
      .post("/reviews", review)
      .then((res) => {
        axios
          .get(`reviews/${params.id}`)
          .then((resp) => {
            setReviews(resp.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const profPicStyle = {
    margin: "0 auto",
    width: "150px",
    height: "150px",
  };

  const dishPicStyle = {
    width: "150px",
    height: "150px",
    marginRight: "10px",
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-padding-top ion-margin-bottom">
          <IonButtons slot="start">
            <IonBackButton defaultHref="" />
          </IonButtons>
          <IonTitle style={{ fontSize: "18px" }} className="ion-text-center">
            {`${chef.firstName} ${chef.lastName}`}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonAvatar style={profPicStyle}>
          <IonImg src={`../../../${chef.profilePicture}`}></IonImg>
        </IonAvatar>

        <IonGrid>
          <IonRadioGroup
            value={selected}
            onIonChange={(e) => setSelected(e.detail.value)}
          >
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel>Dishes</IonLabel>
                  <IonRadio value="dishes" slot="end"></IonRadio>
                </IonItem>
              </IonCol>
              <IonCol>
                <IonItem>
                  <IonLabel>Reviews</IonLabel>
                  <IonRadio value="reviews" slot="end"></IonRadio>
                </IonItem>
              </IonCol>
            </IonRow>
          </IonRadioGroup>
        </IonGrid>
        {selected === "dishes" ? (
          <IonList>
            {dishes.map((dish) => {
              return (
                <IonItem
                  className="ion-margin-top"
                  onClick={() => {
                    history.push(`/dish/page/${dish["_id"]}`);
                  }}
                >
                  <IonImg
                    style={dishPicStyle}
                    src={`../../../${dish["foodPicture"]}`}
                  ></IonImg>
                  {dish["name"]}
                  <br />
                  <br />${dish["price"]}
                  <IonIcon slot="end" icon={chevronForwardOutline} />
                </IonItem>
              );
            })}
          </IonList>
        ) : (
          <div>
            <IonCard className="ion-padding">
              <StarRatings
                name="starRating"
                rating={rating}
                starRatedColor="yellow"
                starHoverColor="yellow"
                starDimension="20px"
                changeRating={(newRating) => setRating(newRating)}
              />
              <IonCardContent>
                <IonTextarea
                  placeholder="Write your review"
                  ref={descInputRef}
                />
              </IonCardContent>
              <IonButton onClick={handleSubmit}>Add review</IonButton>
            </IonCard>
            <IonList>
              {reviews.map((review) => {
                return (
                  <IonItem>
                    <IonGrid >
                      <IonRow>
                        <IonCol>
                          <IonAvatar>
                            <IonImg
                              src={`../../../${review.user.profilePicture}`}
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
                  /*<IonItem className="ion-margin-top">
                    <IonAvatar>
                      <IonImg
                        src={`../../../${review["user"].profilePicture}`}
                      />
                    </IonAvatar>
                    {review["user"].firstName}
                    <br />
                    <br />
                    {review["description"]}
                  </IonItem>*/
                );
              })}
            </IonList>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Chef;
