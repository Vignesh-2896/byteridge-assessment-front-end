import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButton, IonButtons  } from "@ionic/react";
import AuditorFeatures from "./AuditorFeatures";
import { useState, useEffect } from "react";
import { logOutUser } from "../helpers/helper";
import { useHistory } from "react-router-dom";

const AuditorPage: React.FC = () => {

    const [user, setUser] = useState(false);

    let history = useHistory();
  
    useEffect(() => {
      if(localStorage.getItem("user")){
        setUser(true);
      } else {
        history.push("/");
      }
    }, []);

    let logout = async() => {
        await logOutUser();
        setUser(false);
        history.push("/");
      }

    return (
        <IonPage>
            <IonHeader>
            <IonToolbar>
                <IonTitle class = "ion-text-center">Login Application</IonTitle>
                <IonButtons slot = "end">
                    <IonButton color = "danger" onClick={logout}>Log Out</IonButton>
                </IonButtons>
            </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
              {user &&  // Auditor Features are only for Logged in Auditor users.
                <AuditorFeatures />
              }
            </IonContent>
        </IonPage>
    )

}

export default AuditorPage;