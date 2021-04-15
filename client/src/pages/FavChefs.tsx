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
} from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

const FavChefs: React.FC = () => {
  const [favChefs, setFavChefs] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get("/users/favoriteChefs")
      .then((res) => setFavChefs(res.data.favoriteChefs))
      .catch((err) => console.log(err));
  });
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
        <IonList>
          {favChefs.map((chef) => {
            return (
              <IonItem onClick={() => history.push(`/user/chef/${chef.chef._id}`)}>
                <IonAvatar>
                  <IonImg src={`../../../${chef.chef.profilePicture}`} />
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