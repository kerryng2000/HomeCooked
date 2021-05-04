import React from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonIcon, 
  IonButton,
  IonImg,
  IonRow,
  IonCol,
  IonNote,
  IonButtons,
} from '@ionic/react';
import { useHistory } from "react-router";
import { home } from "ionicons/icons";

const Home: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolbar-main">
          <IonButtons slot="start" style={{paddingLeft: '10px'}}>
            <IonIcon icon={home} />
          </IonButtons>
          <IonTitle style={{paddingLeft: '10px'}}>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRow className="home-title layout-center">
          <span style={{fontSize: "16px"}}>Ensuring safety during COVID-19.</span>
        </IonRow>

        <IonRow className="home-top">
          <IonImg src="assets/img/home/1.png" />
          <h1>Welcome to <br/> our food shop!</h1>
        </IonRow>

        <IonRow className="home-top">
          <IonCol size="6" className="ion-text-center">
            <h5 style={{fontFamily: 'cursive'}}>Get the best experience.</h5>
          </IonCol>
          <IonCol size="6" className="ion-text-center">
            <IonButton color="danger" shape="round" 
              onClick={() => {
                history.push(`/dish/allDishes`);
              }}>Go Shopping!</IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol size="2"></IonCol>
          <IonCol size="8"><hr/></IonCol>
        </IonRow>

        <IonRow className="home-type">
            <IonCol size="2"></IonCol>
            <IonCol size="8">
              <IonImg src="assets/img/home/dasher.png" className="home-type-image" />
            </IonCol>
            <IonCol size="2"></IonCol>
        </IonRow>
        <IonRow>
          <IonNote className="home-type-description">
            <h2>Pick a dish.</h2>
            All the dishes are prepared with care and safety to bring you the best experience.
          </IonNote>
        </IonRow>
        <IonRow className="home-type">
            <IonCol size="2"></IonCol>
            <IonCol size="8">
              <IonImg src="assets/img/home/6.jpeg" className="home-type-image" />
            </IonCol>
            <IonCol size="2"></IonCol>
        </IonRow>
        <IonRow className="layout-center">
          <IonNote className="home-type-description">
            Simple payment methods without any fee.
          </IonNote>
        </IonRow>

        <IonRow className="home-type">
            <IonCol size="2"></IonCol>
            <IonCol size="8">
              <IonImg src="assets/img/home/partner.png" className="home-type-image" />
            </IonCol>
            <IonCol size="2"></IonCol>
        </IonRow>
        <IonRow>
          <IonNote className="home-type-description">
            <h2>Feel free.</h2>
            Your dishes are waiting for you to pick up, or it is on the way to you.
          </IonNote>
        </IonRow>


        <IonRow className="home-content-img-right">
          <IonImg src="assets/img/home/3.png"/>
        </IonRow>
        <IonRow>
          <IonNote className="home-type-description-1">
            <h2>It's all here. All In one app.</h2>
            Discover local, on-demand delivery on Pickup from restaurants, nearby grocery and convenience stores, and more.
          </IonNote>
        </IonRow>

        <IonRow className="home-content-img-left">
          <IonImg src="assets/img/home/4.png"/>
        </IonRow>

        <IonRow style={{paddingBottom: '20px'}}>
          <IonNote className="home-type-description-1">
            <h2>Every flavor welcome!</h2>
            From your neighborhood sushi spot to the burger and fries you crave, choose from over 300,000 local and national favorites across the U.S., Canada and Australia.
          </IonNote>
        </IonRow>

      </IonContent>
    </IonPage>
  );
};

export default Home;
