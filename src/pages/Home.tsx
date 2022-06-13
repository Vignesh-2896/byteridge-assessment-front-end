import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonButton, IonButtons, IonText } from '@ionic/react';
import { useState, useEffect } from 'react';
import { logOutUser} from  "../helpers/helper.js"
import './Home.css';
import LoginButtons from './LoginButtons';

const Home: React.FC = () => {

  const [user, setUser] = useState(false);
  const [auditor, setAuditor] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("user")){
      setUser(true);
      setAuditor(JSON.parse(localStorage.getItem("user")||"").userAuditor);
    }
  }, []);

  let logout = async() => {
    await logOutUser();
    setUser(false);
    setAuditor(false);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class = "ion-text-center">Login Application</IonTitle>
          { user && 
                <IonButtons slot = "end">
                  <IonButton color = "danger" onClick={logout}>Log Out</IonButton>
                </IonButtons>
          }
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      { user
            ? ( // Cases where user has logged in.
              <>
                <IonText color='primary'>
                  <h2 className='ion-text-center'>Hello {JSON.parse(localStorage.getItem("user")||"").username},  You have been logged in !</h2>
                </IonText> 
                { auditor &&    // Cases where user is an Auditor.
                 <IonRow class = "ion-justify-content-center">
                    <IonCol sizeLg='4' sizeMd='4'>
                      <IonButton expand='block' href = "/auditor"> Go To Auditor Dashboard</IonButton>
                    </IonCol>
                 </IonRow>
                }
              </>
              )
            : // Cases where user has not logged in.
            (
              <>
                <LoginButtons />
              </>
              )
      }
      </IonContent>
    </IonPage>
  );
};

export default Home;
