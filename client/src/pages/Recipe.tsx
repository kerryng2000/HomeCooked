import { IonList, IonPage, IonItem, IonContent, IonImg, IonHeader, IonToolbar, IonButtons, IonBackButton} from "@ionic/react"
import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const Recipe: React.FC = () => {
  const [dishes, setDishes] = useState([]);
  
  const params = useParams();
  
  useEffect(() => {
    sendGetRequest( params ).then(data => setDishes(data));
    console.log(dishes);
  }, []);

  return (
    <IonPage>
      <IonContent>
      <IonHeader>
          <IonToolbar className="ion-padding-top">
            <IonButtons slot="start">
              <IonBackButton defaultHref=""/>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonList color = "primary">
            {
                dishes.map(dish => {
                    return (
                      <IonItem>
                        Name: {dish['name']}
                        Price: {dish['price']}
                      </IonItem>
                    );
              })
            }
            </IonList>
      </IonContent>
    </IonPage>
  )
  /*const [dishes, setDishes] = useState([]);
  const params = useParams();
  console.log(params)
  useEffect(() => {
    sendGetRequest(  params ).then(data => setDishes(data));
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
                        <IonImg src={`../../../${dish['foodPicture']}`}>
                        </IonImg>
                      </IonItem>
                    );
              })
            }
            </IonList>
          </IonContent>
      </IonPage>
          )*/ 
}

const sendGetRequest = (tsm : any) => {
  var newData = tsm.id;
  console.log(newData);
  return axios({
    url: `/Dishes/${newData}`,
    method: 'get'
  }).then(response => {
    console.log(response);
    return response.data;
  })
};

export default Recipe;