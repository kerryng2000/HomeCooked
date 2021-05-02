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
import { SERVER_URL } from "../apiConfig";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartContents = useSelector((state: AppState) => state.cart);
  const ionListRef = useRef<any>(null);
  const [checkout, setCheckout] = useState({ isOpen: false });

  const openCart = () => {
    dispatch(getCart());
  };

  const handleDeleteItem = (id: string) => {
    console.log("Deleting item" + id);
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

  const mockData = [
    {
      _id: '432432432',
      dish: {
          _id: '432432432',
          foodPicture: 'uploads\\1619834966901.jpeg',
          name: "testtt",
          price: 100,
          stock: 2,
          chef: "Ramazan",
      },
      quantity: 3,
    }
  ]

  return (
    <div>
      <IonMenuToggle autoHide={false} menu="cart">
        <IonFab vertical="top" horizontal="end" style={{ marginTop: "5px", top: "0" }}>
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
                <IonItemSliding>
                  <IonIcon icon={trashOutline} style={{position: 'absolute', right: '0', top: '20px', zIndex: '1000', width: '48px'}}
                      onClick={() => handleDeleteItem(item._id)} color="danger"/>
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
                      <IonImg src={`${SERVER_URL}/${item.dish.foodPicture}`} />
                    </IonThumbnail>
                    <IonGrid>
                      <IonRow className="layout-center">
                        <IonText style={{fontSize: '20px', lineHeight: '2'}}>{item.dish.name}</IonText>
                      </IonRow>
                      <IonRow className="layout-center">
                        <IonText style={{fontSize: '16px', lineHeight: '2'}}>${item.dish.price}</IonText>
                      </IonRow>
                      <IonRow justify-content-center>
                        <IonCol size="4" className="layout-center">
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
                        <IonCol size="4" className="layout-center">
                          <IonText>{item.quantity}</IonText>
                        </IonCol>
                        <IonCol size="4" className="layout-center">
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
                    </IonGrid>
                  </IonItem>
                </IonItemSliding>
              );
            })}
          </IonList>
        </IonContent>
        {cartContents.total > 0 && (
          <h1 className="ion-margin">Total: ${cartContents.total}</h1>
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
          dispatch(getCart());
          setCheckout({ isOpen: false });
        }}
      />
    </div>
  );
};

export default Cart;
