import { IonList, IonPage, IonItem, IonContent, IonRouterLink, IonImg, IonRouterOutlet, IonSpinner} from "@ionic/react"
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import { AppState } from "../reducers";

const Dish: React.FC = () => {
  const isAuthenticated = useSelector((state: AppState) => state.user.isAuthenticated);
  const [loading, setLoading] = useState<boolean>(false);

  const [dishes, setDishes] = useState<any[]>([]);

  const sendGetRequest = () => {
    setLoading(true);
    return axios({
      url: "/Dishes/allDishes",
      method: 'get'
    }).then(response => {
      setLoading(false);
      return response.data;
    })
  };
  
  useEffect(() => {
    sendGetRequest().then(data => setDishes(data));
  }, []);
      
  return (
        <IonPage>
          <IonContent>
            {loading ? <IonSpinner /> : 
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
            </IonList>}
            
          </IonContent>
          {isAuthenticated && <IonRouterLink href="/dish/AddDish">Add Dish here</IonRouterLink>}
      </IonPage>
) }

export default Dish;