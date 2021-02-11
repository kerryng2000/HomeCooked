import { IonContent, IonPage} from '@ionic/react';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import { AppState } from '../reducers';

const Home: React.FC = () => {
  const {isAuthenticated} = useSelector((state: AppState) => state.user);

  return (
    <IonPage>
      <Navbar/>
      <IonContent>
        <h1>Test</h1>
        {isAuthenticated ? <h2>Logged in</h2> : <h2>Logged out</h2>}
      </IonContent>
    </IonPage>
  );
};

export default Home;
