import {
  IonList,
  IonPage,
  IonItem,
  IonContent,
  IonRouterLink,
  IonImg,
  IonToolbar,
  IonButton,
  IonHeader,
  IonButtons,
  IonIcon,
  IonThumbnail,
  IonSearchbar,
  IonSelect,
  IonLabel,
  IonSelectOption,
  IonItemSliding,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { AppState } from "../reducers";
import { addCircleOutline, chevronForwardOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";

const Dish: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: AppState) => state.user.isAuthenticated
  );
  const addedDish = useSelector((state: AppState) => state.dish)

  const [allDishes, setAllDishes] = useState<any[]>([]);
  const [dishes, setDishes] = useState<any[]>([]);
  const [sort, setSort] = useState<String>("nameAtoZ");

  const history = useHistory();

  const sendGetRequest = () => {
    return axios({
      url: "/Dishes/allDishes",
      method: "get",
    }).then((response) => {
      return response.data;
    });
  };

  useEffect(() => {
    sendGetRequest().then((data) => {
      
      setAllDishes(data);
      setDishes(data);
    })
  }, [addedDish]);

  const setSearchText = (value) => {
    setDishes(allDishes);

    if (value && value.trim() !== '')
    {
      setDishes(dishes.filter(dish => {
        return dish.name.toLowerCase().indexOf(value.trim().toLowerCase()) > -1;
      }))
    }
  }

  const sortDishes = (e) => {
    const sortingValue = e.detail.value;  
    const copy = [...dishes];  
    setSort(sortingValue);

    if (sortingValue === "nameAtoZ")
    {
      copy.sort((dish1, dish2) => {
        const name1 = dish1.name.toLowerCase();
        const name2 = dish2.name.toLowerCase();

        if (name1 < name2)
          return -1;
        else if (name1 > name2)
          return 1;
        else
          return 0;
      })
    }
    else if (sortingValue === "nameZtoA")
    {
      copy.sort((dish1, dish2) => {
        const name1 = dish1.name.toLowerCase();
        const name2 = dish2.name.toLowerCase();

        if (name1 > name2)
          return -1;
        else if (name1 < name2)
          return 1;
        else
          return 0;
      })
    }
    else if (sortingValue === "priceLtoH")
    {
      copy.sort((dish1, dish2) => {
        const price1 = dish1.price;
        const price2 = dish2.price;

        if (price1 < price2)
          return -1;
        else if (price1 > price2)
          return 1;
        else
          return 0;
      })
    }
    else if (sortingValue === "priceHtoL")
    {
      copy.sort((dish1, dish2) => {
        const price1 = dish1.price;
        const price2 = dish2.price;

        if (price1 > price2)
          return -1;
        else if (price1 < price2)
          return 1;
        else
          return 0;
      })
    }
    setDishes(copy)    
  }

  const dishPicStyle = {
    width: "150px",
    height: "150px",
    marginRight: "10px",
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-padding-top">
          {isAuthenticated && (
            <IonButtons slot="end">
              <IonButton onClick={() => history.push("/dish/AddDish")}>
                <IonIcon icon={addCircleOutline} />
                Add dish
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar onIonChange={e => setSearchText(e.detail.value!)}/>
        <IonItem>
          <IonLabel>Sort by</IonLabel>
          <IonSelect value={sort} onIonChange={e => sortDishes(e)}>
            <IonSelectOption value="nameAtoZ">Name A-Z</IonSelectOption>
            <IonSelectOption value="nameZtoA">Name Z-A</IonSelectOption>
            <IonSelectOption value="priceLtoH">Price: low to high</IonSelectOption>
            <IonSelectOption value="priceHtoL">Price: high to low</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonList>
          {dishes.map((dish) => {
            return (
              <IonItem
                className="ion-margin-top"
                onClick={() => {
                  history.push(`/dish/page/${dish["_id"]}`);
                }}
              >
                <IonImg
                  style={dishPicStyle}
                  src={`../../../${dish["foodPicture"]}`}
                ></IonImg>
                {dish["name"]}
                <br />
                <br />${dish["price"]}
                <IonIcon slot="end" icon={chevronForwardOutline} />
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Dish;
