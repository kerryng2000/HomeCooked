import { IonButton, IonPage, IonItem, IonLabel, IonInput, IonIcon } from "@ionic/react"
import React from "react";
import { useRef } from "react";
import { useDispatch} from "react-redux";
import { Add } from "../actions/dishActions"
import { useHistory } from "react-router-dom";

const AddDish: React.FC = () => {
    const DishName = useRef<HTMLIonInputElement>(null);
    const DishPrice = useRef<HTMLIonInputElement>(null);
    const DishChef = useRef<HTMLIonInputElement>(null);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>
    {
        
    const Dish = DishName.current!.value;
    const Price = DishPrice.current!.value;
    const Chef = DishChef.current!.value;
    

    const dish = {
      name: String(Dish),
      price: Number(Price),
      chef: String(Chef),
    };
        
        
        dispatch(Add(dish, history));
    }
        return (
            <IonPage>
          <form className="ion-padding" onSubmit={ handleSubmit }>
            <IonItem>
              <IonLabel position="floating">Dish Name</IonLabel>
              <IonInput type="text" ref={ DishName }></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Dish Price</IonLabel>
              <IonInput type="number" ref={ DishPrice }></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Chef</IonLabel>
              <IonInput type="text" ref={ DishChef}></IonInput>
            </IonItem>
            <IonButton className="ion-margin-top" type="submit">Add</IonButton>
          </form>
        </IonPage>
 )
    
    
}

export default AddDish;