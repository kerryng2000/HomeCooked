import {
  IonButton,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonIcon,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import React from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Add } from "../actions/dishActions";
import { useHistory } from "react-router-dom";

const AddDish: React.FC = () => {
  const DishName = useRef<HTMLIonInputElement>(null);
  const DishPrice = useRef<HTMLIonInputElement>(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const Dish = DishName.current!.value;
    const Price = DishPrice.current!.value;

    const dish = {
      name: String(Dish),
      price: Number(Price),
    };

    dispatch(Add(dish, history));
  };
  return (
    <IonPage>
      <IonContent>
      <IonHeader>
          <IonToolbar className="ion-padding-top">
            <IonButtons slot="start">
              <IonBackButton defaultHref=""/>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      <form className="ion-padding" onSubmit={handleSubmit}>
        <IonItem>
          <IonLabel position="floating">Dish Name</IonLabel>
          <IonInput type="text" ref={DishName}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Dish Price</IonLabel>
          <IonInput step="0.01" type="number" ref={DishPrice}></IonInput>
        </IonItem>
        <IonButton className="ion-margin-top" type="submit">
          Add
        </IonButton>
      </form>
      </IonContent>
    </IonPage>
  );
};

export default AddDish;
