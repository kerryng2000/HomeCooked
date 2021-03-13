import {
  IonList,
  IonPage,
  IonItem,
  IonContent,
  IonRouterLink,
  IonImg,
  IonToolbar,
  IonButton,
  IonHeader,
  IonButtons,
  IonIcon,
  IonThumbnail,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { AppState } from "../reducers";
import { addCircleOutline, chevronForwardOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";

const Dish: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: AppState) => state.user.isAuthenticated
  );

  const [dishes, setDishes] = useState<any[]>([]);

  const history = useHistory();

  const sendGetRequest = () => {
    return axios({
      url: "/Dishes/allDishes",
      method: "get",
    }).then((response) => {
      return response.data;
    });
  };

  useEffect(() => {
    sendGetRequest().then((data) => setDishes(data));
  }, [history.location.pathname]);

  const dishPicStyle = {
    width: "150px",
    height: "150px",
    marginRight: "10px"
  };

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar className="ion-padding-top">
            {isAuthenticated && (
              <IonButtons slot="end">
                <IonButton onClick={() => history.push("/dish/AddDish")}>
                  <IonIcon icon={addCircleOutline} />
                  Add dish
                </IonButton>
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>
        <IonList>
          {dishes.map((dish) => {
            return (
              <IonItem className="ion-margin-top" onClick={() => {
                history.push(`/dish/page/${dish['_id']}`)
              }}>
                <IonImg
                  style={dishPicStyle}
                  src={`../../../${dish["foodPicture"]}`}
                ></IonImg>
                {dish["name"]}
                <br />
                <br/>
                ${dish["price"]}
                <IonIcon slot="end" icon={chevronForwardOutline}/>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Dish;
