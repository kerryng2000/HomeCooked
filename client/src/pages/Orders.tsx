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
} from "@ionic/react";
import axios from "axios";
import { chevronForwardOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<any>([{ items: [{dish: {}}] }]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get("/orders")
      .then((res) => {
        setOrders(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const dishPicStyle = {
    width: "150px",
    height: "150px",
    marginRight: "10px",
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
        <IonList>
          {orders.map((order) => {
            return (
              <div>
                <IonListHeader>
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
                        src={`../../../${dish.dish.foodPicture}`}
                      ></IonImg>
                      {dish.dish.name}
                      <br />
                      <br />${dish.dish.price}
                      <br />
                      <br />Quantity: {dish.quantity}
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
