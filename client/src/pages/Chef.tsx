import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
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
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";
import { addCircleOutline, chevronForwardOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { AppState } from "../reducers";

const Chef: React.FC = () => {
  const params: any = useParams();
  const [chef, setChef] = useState<any>({});
  const [dishes, setDishes] = useState<any[]>([]);
  const [selected, setSelected] = useState<String>("dishes");
  const history = useHistory();
  const isAuthenticated = useSelector(
    (state: AppState) => state.user.isAuthenticated
  );
  const email = useSelector((state: AppState) => state.user.profile!.email);

  const requestChef = axios.get(`/users/${params.id}`);
  const requestDishes = axios.get(`/users/dishes/${params.id}`);

  useEffect(() => {
    /*axios
      .get(`/users/${params.id}`)
      .then((res) => {
        console.log(res.data);
        setChef(res.data);
      })
      .catch((err) => console.log(err));*/
    axios.all([requestChef, requestDishes]).then(
      axios.spread((...responses) => {
        setChef(responses[0].data);
        setDishes(responses[1].data);
        console.log(responses[1].data);
      })
    );
  }, []);

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
          {isAuthenticated && email !== chef.email && (
            <IonButtons slot="end">
              <IonButton onClick={() => history.push("/dish/addReview")}>
                <IonIcon icon={addCircleOutline} />
                Add review
              </IonButton>
            </IonButtons>
          )}
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
          <h1>Reviews</h1>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Chef;
