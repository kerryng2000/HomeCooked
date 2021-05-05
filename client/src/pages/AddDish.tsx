import {
  IonButton,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonImg,
} from "@ionic/react";
import React, { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Add } from "../actions/dishActions";
import { useHistory } from "react-router-dom";
import { camera } from "ionicons/icons";
import { Camera, CameraResultType } from "@capacitor/core";
import { decode } from "base64-arraybuffer";

const AddDish: React.FC = () => {
  const DishName = useRef<HTMLIonInputElement>(null);
  const DishPrice = useRef<HTMLIonInputElement>(null);
  const DishStock = useRef<HTMLIonInputElement>(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const [photo, setPhoto] = useState<string>("../../../uploads/defaultfood.jpg");
  const [image, setImage] = useState<any>();
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const Dish = DishName.current!.value;
    const Price = DishPrice.current!.value;
    const Stock = DishStock.current!.value;
    const blob = new Blob([new Uint8Array(decode(image.base64String!))], {
    type: `image/${image.format}`,
    });

    const dish = {
      name: String(Dish),
      price: String(Price),
      stock: String(Stock),
      foodPicture: blob
    };

    dispatch(Add(dish, history, image.format));
  };

  const takePhoto = async () => {
     const image1 = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    })

    setPhoto("data:image/jpeg;base64, " + image1.base64String);
    setImage(image1);

    /*const blob = new Blob([new Uint8Array(decode(image.base64String!))], {
    type: `image/${image.format}`,
    });*/
  }

  return (
    <IonPage>
      <IonHeader>
          <IonToolbar className="ion-padding-top">
            <IonButtons slot="start">
              <IonBackButton defaultHref=""/>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      <IonContent>
      <form className="ion-padding" onSubmit={handleSubmit}>
        <IonItem>
          <IonLabel position="floating">Dish Name</IonLabel>
          <IonInput type="text" ref={DishName}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Dish Price</IonLabel>
          <IonInput step="0.01" type="number" ref={DishPrice}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Dish Stock</IonLabel>
          <IonInput type="number" ref={DishStock}></IonInput>
        </IonItem>
        <IonImg src={photo} style={{width: "200px", height: "200px"}} className="ion-margin-top"></IonImg>
        <IonButton className="ion-margin-top" type="submit">
          Add
        </IonButton>
      </form>
      <IonFab vertical="bottom" horizontal="center" slot="fixed">
        <IonFabButton onClick={takePhoto}>
          <IonIcon icon={camera}></IonIcon>
        </IonFabButton>
      </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default AddDish;
