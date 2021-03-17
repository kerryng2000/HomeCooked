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
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonRow,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  addCircleOutline,
  cartOutline,
  removeCircleOutline,
  trashOutline,
} from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart, removeItem } from "../actions/cartActions";
import { AppState } from "../reducers";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartContents = useSelector((state: AppState) => state.cart.items);
  const ionListRef = useRef<any>(null);

  const openCart = () => {
    dispatch(getCart());
  };

  const handleDeleteItem = (id: string) => {
    console.log("Deleting item" + id);
    dispatch(removeItem(id));
    ionListRef.current!.closeSlidingItems();
    dispatch(getCart())
  }

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
          <IonList ref={ionListRef}>
            {cartContents.map((item) => {
              return (
                <IonItemSliding>
                  <IonItemOptions onIonSwipe={() => handleDeleteItem(item._id)}>
                    <IonItemOption color="danger" expandable onClick={() => handleDeleteItem(item._id)}>
                      <IonIcon slot="icon-only" icon={trashOutline}/>
                    </IonItemOption>
                  </IonItemOptions>

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
                            <IonIcon slot="icon-only" icon={addCircleOutline} />
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
                </IonItemSliding>
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
