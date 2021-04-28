import {
  IonList,
  IonPage,
  IonItem,
  IonContent,
  IonCol,
  IonRouterLink,
  IonItemOptions,
  IonItemOption,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { AppState } from "../reducers";

const Mailbox: React.FC = () => {
  const [dishes, setDishes] = useState([]);
  const params = useParams();
  const tab = useSelector((state: AppState) => state.path.tab);
  const history = useHistory();
  useEffect(() => {
    sendGetRequest(params).then((data) => setDishes(data));
  }, []);
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
          {dishes.map((mail) => {
            return (
              <IonItem className="ion-margin-top">
                sender: {mail["sender"]}
                <br></br>
                text: {mail["text"]}
                <IonCol className="ion-align-self-center">
                  <IonRouterLink onClick={() => history.push(`/${tab}/Message/${mail["sender"]}`)}>
                    Reply
                  </IonRouterLink>
                </IonCol>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

const sendGetRequest = (tsm: any) => {
  var newData = tsm.id;
  return axios({
    url: `/Mailbox/${newData}`,
    method: "get",
  }).then((response) => {
    console.log(response);
    return response.data;
  });
};

export default Mailbox;
