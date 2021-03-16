import {
  IonApp,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRow,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addCircleOutline, cartOutline, removeCircleOutline } from "ionicons/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../actions/cartActions";
import { AppState } from "../reducers";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartContents = useSelector((state: AppState) => state.cart.items);

  const openCart = () => {
    dispatch(getCart());
  };

  return (
    <div>
      <IonMenuToggle autoHide={false} menu="cart">
        <IonFab vertical="top" horizontal="end" style={{ marginTop: "15%" }}>
          <IonFabButton onClick={openCart}>
            <IonIcon icon={cartOutline} />
          </IonFabButton>
        </IonFab>
      </IonMenuToggle>
      <IonMenu menuId="cart" contentId="cart" side="end">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Cart</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {cartContents.map((item) => {
              return (
                <IonItem className="ion-margin-top">
                  <IonThumbnail
                    style={{
                      minWidth: "7rem",
                      minHeight: "7rem",
                      maxHeight: "7rem",
                      maxWidth: "7rem",
                      marginRight: "10px",
                    }}
                  >
                    <IonImg src={`../../../${item.dish.foodPicture}`} />
                  </IonThumbnail>
                  <IonGrid>
                    <IonRow className="ion-align-items-end">
                      <IonCol>{item.dish.name}</IonCol>
                      <IonCol>
                      <IonButton size="small" fill="clear">
                          <IonIcon
                            slot="icon-only"
                            icon={addCircleOutline}
                          />
                        </IonButton>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol offset="7.7">
                        <IonText>{item.quantity}</IonText>
                      </IonCol>
                    </IonRow>
                    <IonRow className="ion-align-items-center">
                      <IonCol>${item.dish.price}</IonCol>
                      <IonCol>
                      <IonButton size="small" fill="clear">
                          <IonIcon
                            slot="icon-only"
                            icon={removeCircleOutline}
                          />
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonItem>
              );
            })}
          </IonList>
        </IonContent>
        {cartContents && (
          <IonButton className="ion-margin-bottom">Checkout</IonButton>
        )}
      </IonMenu>
    </div>
  );
};

export default Cart;
