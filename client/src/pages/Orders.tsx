import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonList,
  IonListHeader,
  IonPage,
  IonToolbar,
  IonTitle
} from "@ionic/react";
import axios from "axios";
import { chevronForwardOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { SERVER_URL } from "../apiConfig";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<any>([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/orders`)
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const dishPicStyle = {
    width: "150px",
    height: "150px",
    marginRight: "30px",
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolbar-main">
          <IonButtons slot="start">
            <IonBackButton defaultHref="" />
          </IonButtons>
          <IonTitle>Orders</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {orders.map((order) => {
            return (
              <div>
                <IonListHeader className="order-header">
                  {order.date} Total: ${order.total}
                </IonListHeader>
                {order.items.map((dish) => {
                  return (
                    <IonItem
                      className="ion-margin-top"
                      onClick={() => {
                        history.push(`/user/page/${dish.dish._id}`);
                      }}
                    >
                      <IonImg
                        style={dishPicStyle}
                        src={`${SERVER_URL}/${dish.dish.foodPicture}`}
                      ></IonImg>
                      <span style={{fontSize: '20px', lineHeight: '1.5'}}>
                        {dish.dish.name}
                        <br />
                        ${dish.dish.price}
                        <br />
                        Quantity: {dish.quantity}
                      </span>
                      <IonIcon slot="end" icon={chevronForwardOutline} />
                    </IonItem>
                  );
                })}
              </div>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Orders;
