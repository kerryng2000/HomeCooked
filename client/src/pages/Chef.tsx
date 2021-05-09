import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
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
  IonSpinner,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";
import {
  chevronForwardOutline,
  heartOutline,
  heartSharp,
} from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { AppState } from "../reducers";
import StarRatings from "react-star-ratings";
import { addFavorite, removeFavorite } from "../actions/userActions";
import { SERVER_URL } from "../apiConfig";

const Chef: React.FC = () => {
  const params: any = useParams();
  const dispatch = useDispatch();
  const [chef, setChef] = useState<any>({firstName: "", lastName: ""});
  const [dishes, setDishes] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [selected, setSelected] = useState<String>("dishes");
  const user = useSelector((state: AppState) => state.user);
  const email = user.profile!.email;
  const [favorite, setFavorite] = useState<boolean>(
    user.profile!.favoriteChefs!.some((e) => e.chef === params.id)
  );
  const history = useHistory();
  const isAuthenticated = user.isAuthenticated;
  const [rating, setRating] = useState<any>(1);
  const descInputRef = useRef<HTMLIonTextareaElement>(null);
  const [loading, setLoading] = useState(false);
  const tab = useSelector((state: AppState) => state.path.tab)

  const requestChef = axios.get(`${SERVER_URL}/users/${params.id}`);
  const requestDishes = axios.get(`${SERVER_URL}/users/dishes/${params.id}`);
  const requestReviews = axios.get(`${SERVER_URL}/reviews/${params.id}`);

  useEffect(() => {
    setLoading(true);
    axios.all([requestChef, requestDishes, requestReviews]).then(
      axios.spread((...responses) => {
        setChef(responses[0].data);
        setDishes(responses[1].data);
        setReviews(responses[2].data);
        setLoading(false);
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
      .post(`${SERVER_URL}/reviews`, review, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
    })
      .then((res) => {
        axios
          .get(`${SERVER_URL}/reviews/${params.id}`)
          .then((resp) => {
            setReviews(resp.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const renderHeart = () => {
    if (isAuthenticated && email !== chef.email) {
      if (favorite)
        return (
          <IonIcon
            onClick={handleRemoveFavorite}
            color="primary"
            size="large"
            slot="end"
            icon={heartSharp}
            style={{paddingRight: '10px'}}
          />
        );
      else
        return (
          <IonIcon
            onClick={handleAddFavorite}
            color="primary"
            size="large"
            slot="end"
            icon={heartOutline}
            style={{paddingRight: '10px'}}
          />
        );
    }
  };

  const handleRemoveFavorite = () => {
    dispatch(removeFavorite(chef._id));
    setFavorite(false);
  };

  const handleAddFavorite = () => {
    dispatch(addFavorite(chef._id));
    setFavorite(true);
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

  const loadingStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolbar-main">
          <IonButtons slot="start">
            <IonBackButton defaultHref="" />
          </IonButtons>
          <IonTitle style={{ fontSize: "18px" }} className="ion-text-center">
            {`${chef.firstName} ${chef.lastName}`}
          </IonTitle>
          {renderHeart()}
        </IonToolbar>
      </IonHeader>
      {loading ? (
        <IonSpinner style={loadingStyle} />
      ) : (
        <IonContent>
          <IonAvatar style={profPicStyle}>
            <IonImg src={`${SERVER_URL}/${chef.profilePicture}`}></IonImg>
          </IonAvatar>

          <IonGrid>
            <IonRadioGroup
              value={selected}
              onIonChange={(e) => setSelected(e.detail.value)}
            >
              {selected === "dishes" ? 
                <IonRow>
                  <IonCol>
                    <IonItem style={{borderBottom: '3px solid blue'}}>
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
              :
                <IonRow>
                  <IonCol>
                    <IonItem>
                      <IonLabel>Dishes</IonLabel>
                      <IonRadio value="dishes" slot="end"></IonRadio>
                    </IonItem>
                  </IonCol>
                  <IonCol>
                    <IonItem style={{borderBottom: '3px solid blue'}}>
                      <IonLabel>Reviews</IonLabel>
                      <IonRadio value="reviews" slot="end"></IonRadio>
                    </IonItem>
                  </IonCol>
                </IonRow>
              }
            </IonRadioGroup>
          </IonGrid>
          {selected === "dishes" ? (
            <IonList>
              {dishes.map((dish) => {
                return (
                  <IonItem
                    className="ion-margin-top"
                    onClick={() => {
                      history.push(`/${tab}/page/${dish["_id"]}`);
                    }}
                    key={dish._id}
                  >
                    <IonImg
                      style={dishPicStyle}
                      src={`${SERVER_URL}/${dish["foodPicture"]}`}
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
                    className="review-editor"
                  />
                </IonCardContent>
                <IonButton onClick={handleSubmit}>Add review</IonButton>
              </IonCard>
              <IonList>
                {reviews.map((review) => {
                  return (
                    <IonItem key={review._id}>
                      <IonGrid>
                        <IonRow>
                          <IonCol>
                            <IonAvatar>
                              <IonImg
                                src={`${SERVER_URL}/${review.user.profilePicture}`}
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
                          <IonCol pull="7">{review.description}</IonCol>
                        </IonRow>
                      </IonGrid>
                    </IonItem>
                  );
                })}
              </IonList>
            </div>
          )}
        </IonContent>
      )}
    </IonPage>
  );
};

export default Chef;
