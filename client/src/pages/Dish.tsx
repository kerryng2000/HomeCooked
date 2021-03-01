import { IonList, IonPage, IonItem, IonContent, IonRouterLink } from "@ionic/react"
import React, { useState, useEffect } from "react";
import axios from 'axios';

const Dish: React.FC = () => {


  const [dishes, setDishes] = useState([]);
  useEffect(() => {
    sendGetRequest().then(data => setDishes(data));
  }, []);
      return (
        <IonPage>
          <IonContent color = "primary" >
            <IonList color = "primary">
            {
                dishes.map(dish => {
                    return (
                      <IonItem>
                        Name: {dish['name']}
                        Price: {dish['price']}
                        Chef: {dish['chef']}
                      </IonItem>
                    );
              })
            }
            </IonList>
          </IonContent>
          <IonRouterLink href="/AddDish">Add Dish here</IonRouterLink>
      </IonPage>
) }
const sendGetRequest = () => {
  return axios({
    url: "/Dishes/allDishes",
    method: 'get'
  }).then(response => {
    console.log(response);
    return response.data;
  })
};

export default Dish;