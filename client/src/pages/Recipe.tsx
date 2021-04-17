import {
  IonPage,
  IonContent,
  IonImg,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonSpinner,
  IonTitle,
  IonAvatar,
  IonGrid,
  IonCol,
  IonRow,
  IonButton,
  IonIcon,
  IonText,
  IonRouterLink
} from "@ionic/react";
import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { addCircleOutline, removeCircleOutline } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../reducers";
import { addToCart } from "../actions/cartActions";

const Recipe: React.FC = () => {
  const [dish, setDish] = useState<any>({});
  const [chef, setChef] = useState<any>({});
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useSelector((state: AppState) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const email = useSelector((state: AppState) => state.user.profile!.email);
  const history = useHistory();

  const params = useParams();

  useEffect(() => {
    sendGetRequest(params);
  }, []);

  const sendGetRequest = (tsm: any) => {
    setLoading(true);
    var newData = tsm.id;
    axios({
      url: `/Dishes/${newData}`,
      method: "get",
    }).then((response) => {
      setDish(response.data);
      setChef(response.data.chef)
      setLoading(false);
    });
  };

  const sendChefRequest = (chefId: any) => {
    axios
      .get(`/users/${chefId}`)
      .then((chef) => {
        setChef(chef.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const increaseAmount = () => {
    if (amount + 1 <= dish.stock)
      setAmount(amount + 1);
  }

  const decreaseAmount = () => {
    if (amount - 1 >= 0)
      setAmount(amount - 1);
  }

  const handleAddToCart = () => {
    if (amount > 0)
    {
      const item = {
        dish: dish._id,
        quantity: amount
      }
      dispatch(addToCart(item));
    }

  }

  const loadingStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const profPicStyle = {
    width: "100px",
    height: "100px",
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-padding-top ion-margin-bottom">
          <IonButtons slot="start">
            <IonBackButton defaultHref="" />
          </IonButtons>
          <IonTitle style={{fontSize: "24px"}} className="ion-text-center">
            {dish.name}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      {loading ? (
        <IonSpinner style={loadingStyle} />
      ) : (
        <IonContent>
          <IonImg
            className="ion-margin-bottom"
            src={`../../../${dish["foodPicture"]}`}
          ></IonImg>

          <IonGrid className="ion-padding">
            <IonRow>
              <IonCol>
                <IonAvatar style={profPicStyle} onClick={() => history.push(`/dish/chef/${chef._id}`)}>
                  <IonImg src={`../../../${chef.profilePicture}`}></IonImg>
                </IonAvatar>
              </IonCol>
              <IonCol className="ion-align-self-center">
                <h1 style={{float: "right",}}>${dish.price}</h1>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="ion-align-self-center">
                <h2>
                  {chef.firstName} {chef.lastName}
                </h2>
              </IonCol>
              <IonCol className="ion-align-self-center">
              <IonRouterLink href= {`/Message/${chef.email}`}>Have a Question? Send a Message</IonRouterLink>
              </IonCol>
              {email !== chef.email && 
              <IonCol className="ion-align-self-center ion-margin-bottom">
              <IonButton fill="clear" onClick={decreaseAmount}>
                <IonIcon slot="icon-only" icon={removeCircleOutline}/>
              </IonButton>
              <IonText>{amount}</IonText>
              <IonButton fill="clear" onClick={increaseAmount}>
                <IonIcon slot="icon-only" icon={addCircleOutline}/>
              </IonButton>
            </IonCol>
              }
            </IonRow>
          </IonGrid>
          {isAuthenticated && email !== chef.email && <IonButton onClick={handleAddToCart} expand="block">Add to cart</IonButton>}
        </IonContent>
      )}
    </IonPage>
  );
};

export default Recipe;
