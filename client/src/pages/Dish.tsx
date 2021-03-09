import { IonList, IonPage, IonItem, IonContent, IonRouterLink, IonImg, IonRouterOutlet} from "@ionic/react"
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import { AppState } from "../reducers";

const Dish: React.FC = () => {
  const isAuthenticated = useSelector((state: AppState) => state.user.isAuthenticated);

  const [dishes, setDishes] = useState<any[]>([]);
  useEffect(() => {
    sendGetRequest().then(data => setDishes(data));
  }, []);
      return (
        <IonPage>
          <IonContent >
            <IonList >
            {
                dishes.map(dish => {
                  return (
                      <IonItem>
                        Name: {dish['name']}
                        Price: {dish['price']}
                        Chef: {dish['chef'].firstName} {dish['chef'].lastName}
                        <IonImg src={`../../../${dish['foodPicture']}`}>
                        </IonImg>
                        <IonRouterLink href= {`/Dishes/${dish['_id']}`}>Order</IonRouterLink>
                      </IonItem>
                    );
              })
            }
            </IonList>
          </IonContent>
          {isAuthenticated && <IonRouterLink href="/dish/AddDish">Add Dish here</IonRouterLink>}

      </IonPage>
) }

const sendGetRequest = () => {
  return axios({
    url: "/Dishes/allDishes",
    method: 'get'
  }).then(response => {
    return response.data;
  })
};

export default Dish;