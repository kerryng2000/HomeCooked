import {
  IonList,
  IonPage,
  IonItem,
  IonContent,
  IonImg,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonSpinner,
} from "@ionic/react";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Recipe: React.FC = () => {
  const [dish, setDish] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    sendGetRequest(params)
  }, []);

  let initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current)
      initialRender.current = false;
    else{
      setLoading(false);
      console.log(dish.name)
    }
  },[dish])

  const sendGetRequest = (tsm: any) => {
    setLoading(true);
    var newData = tsm.id;
    axios({
      url: `/Dishes/${newData}`,
      method: "get",
    }).then((response) => {
      setDish(response.data)
    });
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
        <IonToolbar className="ion-padding-top">
          <IonButtons slot="start">
            <IonBackButton defaultHref="" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {loading ? (
          <IonSpinner style={loadingStyle} />
        ) : (
          <h1>{dish!.name}</h1>
        )}
      </IonContent>
    </IonPage>
  );
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
};

export default Recipe;
