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
  IonCol,
  IonRow,
  IonButton,
  IonIcon,
  IonText,
} from "@ionic/react";
import React, { useState, useEffect} from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { addCircleOutline, removeCircleOutline } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../reducers";
import { addToCart } from "../actions/cartActions";
import { SERVER_URL } from "../apiConfig";

const Recipe: React.FC = () => {
  const [dish, setDish] = useState<any>({});
  const [chef, setChef] = useState<any>({});
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const isAuthenticated = useSelector(
    (state: AppState) => state.user.isAuthenticated
  );
  const dispatch = useDispatch();
  const email = useSelector((state: AppState) => state.user.profile!.email);
  const history = useHistory();
  const tab = useSelector((state: AppState) => state.path.tab);

  const params = useParams();

  useEffect(() => {
    sendGetRequest(params);
  }, []);

  const sendGetRequest = (tsm: any) => {
    setLoading(true);
    var newData = tsm.id;
    axios({
      url: `${SERVER_URL}/Dishes/${newData}`,
      method: "get",
    }).then((response) => {
      setDish(response.data);
      setChef(response.data.chef);
      setLoading(false);
    });
  };

  const increaseAmount = () => {
    if (amount + 1 <= dish.stock) setAmount(amount + 1);
  };

  const decreaseAmount = () => {
    if (amount - 1 >= 0) setAmount(amount - 1);
  };

  const handleAddToCart = () => {
    if (amount > 0) {
      const item = {
        dish: dish._id,
        quantity: amount,
      };
      dispatch(addToCart(item));
    }
  };

  const loadingStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const profPicStyle = {
    width: "100%",
    height: 'auto',
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolbar-main">
          <IonButtons slot="start">
            <IonBackButton defaultHref="" />
          </IonButtons>
          <IonTitle style={{ fontSize: "24px" }} className="ion-text-center">
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
            src={`${SERVER_URL}/${dish["foodPicture"]}`}
            style={{ width: "100%" }}
          ></IonImg>

            <IonRow>
              <IonCol size="6">
                <IonAvatar
                  style={profPicStyle}
                  onClick={() => history.push(`/${tab}/chef/${chef._id}`)}
                >
                  <IonImg src={`${SERVER_URL}/${chef.profilePicture}`}></IonImg>
                </IonAvatar>
                <h2 style={{textAlign: 'center'}}>
                  {chef.firstName} {chef.lastName}
                </h2>
              </IonCol>
              <IonCol
                size="6"
                className="detail-price-container"
              >
                <IonRow className="detail-price">
                  <h1>${dish.price}</h1>
                </IonRow>
                  {email !== chef.email && (
                    <IonRow className="control-btn">
                      <IonButton fill="clear" onClick={decreaseAmount}>
                        <IonIcon slot="icon-only" icon={removeCircleOutline} />
                      </IonButton>
                      <IonText>{amount}</IonText>
                      <IonButton fill="clear" onClick={increaseAmount}>
                        <IonIcon slot="icon-only" icon={addCircleOutline} />
                      </IonButton>
                    </IonRow>
                  )}
              </IonCol>
            </IonRow>
            {isAuthenticated && email !== chef.email && (
              <>
                <IonRow>
                  <IonCol size="2"></IonCol>
                  <IonCol size="8">
                    <hr/>
                  </IonCol>
                </IonRow>
                <IonRow className="question-link">
                  <span>
                    Have a Question?&nbsp;&nbsp;
                  </span>
                  <IonButton color="danger" shape="round" onClick={() => history.push(`/${tab}/Message/${chef.email}`)}>Send a Message</IonButton>
                </IonRow>
              </>
            )}
        </IonContent>
      )}
      {isAuthenticated && email !== chef.email && (
        <IonButton onClick={handleAddToCart} style={{margin: 0}}>
          Add to cart
        </IonButton>
      )}
    </IonPage>
  );
};

export default Recipe;
