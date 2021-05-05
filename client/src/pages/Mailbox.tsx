import {
  IonList,
  IonPage,
  IonItem,
  IonContent,
  IonCol,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonRow,
  IonTitle,
  IonButton
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { AppState } from "../reducers";

const Mailbox: React.FC = () => {
  const [dishes, setDishes] = useState([{}]);
  const params = useParams();
  const tab = useSelector((state: AppState) => state.path.tab);
  const history = useHistory();
  useEffect(() => {
    sendGetRequest(params).then((data) => setDishes(data));
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolbar-main">
          <IonButtons slot="start">
            <IonBackButton defaultHref="" />
          </IonButtons>
          <IonTitle>Mailbox</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {dishes.map((mail) => {
            return (
              <IonItem className="ion-margin-top">
                <IonRow>
                  <IonCol size="10" style={{paddingRight: '10px'}}>
                    <span style={{fontSize: '24px', lineHeight: '1.5'}}>Snder: {mail["sender"]}</span>
                    <br/><br/>
                    <span style={{fontSize: '20px', color: '#888'}}>{mail["text"]}</span>
                  </IonCol>
                  <IonCol style={{justifyContent: 'center', display: 'flex', alignItems: 'center'}} size="2">
                    <IonButton color="success" shape="round" onClick={() => history.push(`/${tab}/Message/${mail["sender"]}`)}>
                      Reply
                      </IonButton>
                  </IonCol>
                </IonRow>
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
    return response.data;
  });
};

export default Mailbox;
