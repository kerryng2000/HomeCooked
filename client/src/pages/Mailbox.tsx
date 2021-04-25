import { IonList, IonPage, IonItem, IonContent, IonCol, IonRouterLink, IonItemOptions, IonItemOption, IonHeader} from "@ionic/react"
import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const Mailbox: React.FC = () => {
  const [dishes, setDishes] = useState([]);
  const params = useParams();
  useEffect(() => {
    sendGetRequest( params ).then(data => setDishes(data));
  }, []);
      return (
        <IonPage>
          <IonHeader>Mailbox</IonHeader>
          <IonContent color = "primary" >
            <IonList  >
            {
                dishes.map((mail) => {
                    return (
                      <IonItem  className="ion-margin-top">
                        sender: {mail['sender']}
                        <br></br>
                        text: {mail['text']}
                        <IonCol className="ion-align-self-center">
                        <IonRouterLink href= {`/Message/${mail['sender']}`}>Reply</IonRouterLink>
                      </IonCol>
                      </IonItem>
                    );
              })
            }
            </IonList>
          </IonContent>
      </IonPage>
) }

const sendGetRequest = (tsm : any) => {
  var newData = tsm.id;
  return axios({
    url: `/Mailbox/${newData}`,
    method: 'get'
  }).then(response => {
    console.log(response);
    return response.data;
  })
};

export default Mailbox;