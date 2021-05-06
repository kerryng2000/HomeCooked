import {
  IonAvatar,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonToolbar,
  IonTitle
} from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { SERVER_URL } from "../apiConfig";

const FavChefs: React.FC = () => {
  const [favChefs, setFavChefs] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/users/favoriteChefs`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwt")}`
        }
    })
      .then((res) => setFavChefs(res.data.favoriteChefs))
      .catch((err) => console.log(err));
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolbar-main">
          <IonButtons slot="start">
            <IonBackButton defaultHref="" />
          </IonButtons>
          <IonTitle>Favorite Chefs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {favChefs.map((chef) => {
            return (
              <IonItem onClick={() => history.push(`/user/chef/${chef.chef._id}`)} key={chef._id}>
                <IonAvatar>
                  <IonImg src={`${SERVER_URL}/${chef.chef.profilePicture}`} />
                </IonAvatar>
                <IonLabel className="ion-margin">{chef.chef.firstName} {chef.chef.lastName}</IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default FavChefs;
