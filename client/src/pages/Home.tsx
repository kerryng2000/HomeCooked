import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useSelector } from 'react-redux';
import { AppState } from '../reducers';

const Home: React.FC = () => {
  const {isAuthenticated} = useSelector((state: AppState) => state.user);
  console.log("isAuth " + isAuthenticated);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hello</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h1>Test</h1>
        {isAuthenticated ? <h2>Logged in</h2> : <h2>Logged out</h2>}
      </IonContent>
    </IonPage>
  );
};

export default Home;
