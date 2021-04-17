import { IonList, IonPage, IonItem, IonContent, IonImg} from "@ionic/react"
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
          <IonContent color = "primary" >
            <IonList color = "primary">
            {
                dishes.map((mail, index) => {
                    return (
                      <IonItem  className="ion-margin-top" key = {index}>
                        sender: {mail['sender']}
                        text: {mail['text']}
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