import {
  IonButton,
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
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  getCart,
  incrementQuantity,
  removeItem,
} from "../actions/cartActions";
import { AppState } from "../reducers";
import Checkout from "./Checkout";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartContents = useSelector((state: AppState) => state.cart);
  const ionListRef = useRef<any>(null);
  const [checkout, setCheckout] = useState({ isOpen: false });

  const openCart = () => {
    dispatch(getCart());
  };

  const handleDeleteItem = (id: string) => {
    dispatch(removeItem(id));
    ionListRef.current!.closeSlidingItems();
  };

  const handleIncrement = (itemId: string, stock: number, quantity: number) => {
    if (quantity + 1 <= stock) dispatch(incrementQuantity(itemId));
  };

  const handleDecrement = (itemId: string, quantity: number) => {
    dispatch(decrementQuantity(itemId));

    if (quantity - 1 === 0) dispatch(removeItem(itemId));
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
          <IonList ref={ionListRef}>
            {cartContents.items.map((item) => {
              return (
                <IonItemSliding key={item._id}>
                  <IonItemOptions onIonSwipe={() => handleDeleteItem(item._id)}>
                    <IonItemOption
                      color="danger"
                      expandable
                      onClick={() => handleDeleteItem(item._id)}
                    >
                      <IonIcon slot="icon-only" icon={trashOutline} />
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
                      <IonImg src={`${item.dish.foodPicture}`} />
                    </IonThumbnail>
                    <IonGrid>
                      <IonRow className="ion-align-items-end">
                        <IonCol>{item.dish.name}</IonCol>
                        <IonCol>
                          <IonButton
                            size="small"
                            fill="clear"
                            onClick={() =>
                              handleIncrement(
                                item._id,
                                item.dish.stock,
                                item.quantity
                              )
                            }
                          >
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
                          <IonButton
                            size="small"
                            fill="clear"
                            onClick={() =>
                              handleDecrement(item._id, item.quantity)
                            }
                          >
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
        {cartContents.total > 0 && (
          <h1 className="ion-margin" style={{color: "black"}}>Total: ${cartContents.total}</h1>
        )}
        {cartContents.items.length > 0 && (
          <IonButton
            className="ion-margin-bottom"
            onClick={() => setCheckout({ isOpen: true })}
          >
            Checkout
          </IonButton>
        )}
      </IonMenu>
      <Checkout
        isOpen={checkout.isOpen}
        onClose={() => {
          dispatch(getCart())
          setCheckout({ isOpen: false })
        }}
      />
    </div>
  );
};

export default Cart;
