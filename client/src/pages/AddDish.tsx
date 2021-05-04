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
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonRippleEffect
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
        <IonToolbar className="toolbar-main">
          <IonButtons slot="start">
              <IonBackButton defaultHref="" />
          </IonButtons>
          <IonTitle>Add Dish</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit} autoComplete="off">
            <IonGrid style={{paddingTop: '50px'}}>
                <IonRow justify-content-center align-items-center className="form-row register">
                    <IonCol align-self-center>
                        <IonItem>
                            <IonLabel position="floating" className="form-label register">Dish Name:</IonLabel>
                            <IonInput
                                className="form-input"
                                ref={ DishName }
                                required
                            />
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow justify-content-center align-items-center className="form-row register">
                    <IonCol align-self-center>
                        <IonItem>
                            <IonLabel position="floating" className="form-label">Dish Price:</IonLabel>
                            <IonInput
                                className="form-input"
                                type="number"
                                ref={ DishPrice }
                                required
                            />
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow justify-content-center align-items-center className="form-row register">
                    <IonCol align-self-center>
                        <IonItem>
                            <IonLabel position="floating" className="form-label">Dish Stock:</IonLabel>
                            <IonInput
                                className="form-input"
                                type="number"
                                ref={ DishStock }
                                required
                            />
                        </IonItem>
                    </IonCol>
                </IonRow>

                <IonRow style={{display: 'flex', justifyContent: 'center', margin: '20px 0'}}>
                  <IonImg src={photo} style={{width: "200px", height: "200px"}}></IonImg>
                </IonRow>

                <IonRow justify-content-center align-items-center>
                    <IonCol align-self-center>
                        <IonButton
                            className="c-login-page__submit"
                            type="submit"
                            color="primary"
                            size="large"
                            expand="block"
                            shape="round"
                            strong
                        >
                            Add
                            <IonRippleEffect></IonRippleEffect>
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
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
