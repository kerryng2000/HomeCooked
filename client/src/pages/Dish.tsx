import {
  IonPage,
  IonItem,
  IonContent,
  IonToolbar,
  IonButton,
  IonHeader,
  IonButtons,
  IonIcon,
  IonSearchbar,
  IonSelect,
  IonLabel,
  IonSelectOption,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonNote,
  IonBackButton,
  IonToast
} from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../reducers";
import { addCircleOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { setErrorFlag } from "../actions/dishActions";

import ProductCard from "../components/ProductCard";
import { SERVER_URL } from "../apiConfig";

const Dish: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: AppState) => state.user.isAuthenticated
  );
  const addedDish = useSelector((state: AppState) => state.dish.count);
  const showError = useSelector((state: AppState) => state.dish.showError);
  const errorMessage = useSelector((state: AppState) => state.dish.errorMessage);
  const dispatch = useDispatch();

  const [allDishes, setAllDishes] = useState<any[]>([]);
  const [dishes, setDishes] = useState<any[]>([]);
  const [sort, setSort] = useState<String>("nameAtoZ");

  const history = useHistory();

  const sendGetRequest = () => {
    return axios.get(`${SERVER_URL}/Dishes/allDishes`).then((response) => {
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

  const search = (e) => {
    setSearchText(e.target.value);
  }

  const closeToast = () => {
    dispatch(setErrorFlag(false, ''));
  }

  return (
    <IonPage>
        <IonHeader>
          <IonToolbar className="toolbar-main">
            <IonRow>
              <IonCol size="4" style={{alignItems: 'center', display: 'flex'}}>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="" />
                </IonButtons>
                <IonTitle >Dish</IonTitle>
              </IonCol>
              <IonCol size="4">
                {isAuthenticated && (
                  <IonButton onClick={() => history.push("/dish/AddDish")} color="danger" shape="round">
                    <IonIcon icon={addCircleOutline} />
                    &nbsp;Add dish
                  </IonButton>
                )}
              </IonCol>
            </IonRow>
          </IonToolbar>
        </IonHeader>
			
			<IonContent fullscreen>
        <IonToast
          isOpen={showError}
          onDidDismiss={closeToast}
          message={errorMessage}
          duration={2000}
          cssClass="toast-message"
       />
        <IonSearchbar className="search" onKeyUp={ search } placeholder="Search by name..." searchIcon={ searchOutline } animated={ true }  />
        <IonItem>
          <IonLabel>Sort by</IonLabel>
          <IonSelect value={sort} onIonChange={e => sortDishes(e)}>
            <IonSelectOption value="nameAtoZ">Name A-Z</IonSelectOption>
            <IonSelectOption value="nameZtoA">Name Z-A</IonSelectOption>
            <IonSelectOption value="priceLtoH">Price: low to high</IonSelectOption>
            <IonSelectOption value="priceHtoL">Price: high to low</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonGrid>
          <IonRow className="ion-text-center">
              <IonCol size="12">
                  <IonNote>{ dishes && dishes.length } { (dishes.length > 1 || dishes.length === 0) ? " products" : " product" } found</IonNote>
              </IonCol>
          </IonRow>
          <IonRow>
              { dishes && dishes.map((dish, index) => {
                return (
                  <ProductCard 
                    key={ `category_product_${ index }`} 
                    product={ dish } 
                    index={ index } 
                  />
                );
              })}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Dish;
