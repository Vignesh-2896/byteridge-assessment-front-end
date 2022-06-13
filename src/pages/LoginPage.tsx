import { IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButton, IonButtons, IonBackButton, IonText, IonItem, IonLabel, IonInput, IonToast, IonContent } from '@ionic/react';
import { useState, useEffect } from 'react';
import {logUser, logOutUser} from  "../helpers/helper.js"
import { useHistory } from "react-router-dom";
import './Home.css';

const LoginForm: React.FC = () => {

    const [form, setForm] = useState({
        username : "",
        password : ""
      });

    const [user, setUser] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");


    const updateForm = (e:any) => {
        setForm({...form, [e.currentTarget.name]:e.currentTarget.value})
    }

    let history = useHistory();

    useEffect(() => {
      if(localStorage.getItem("user") !== null)
        setUser(true);
    }, []);

    let formSubmitAction = async(e:any) => {
        e.preventDefault();
        let response  = await fetch("http://localhost:4000/users/authenticate",{
            method : 'POST',
            mode:'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        });
        if(response.status===400){  // If incorrect credentials are present, intimate user and reset the fields.
            let errMsg = await response.json();
            setToastMessage(errMsg.message);
            setShowToast(true);

            let inputFields = document.getElementById("entryForm") as HTMLFormElement;
            inputFields.reset();

        } else {              // If valid credentials are present, update localStorage and redirect to the home page.
            let loggedInUser =  await response.json();
            localStorage.setItem("user",JSON.stringify(loggedInUser));
            setUser(true);
            let userData = JSON.parse(localStorage.getItem("user")||"");
            logUser("Entry", userData);
            history.push("/")
        }

    }

    let logout = async() => {
      await logOutUser();
      setUser(false);
    }

    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                  <IonBackButton defaultHref="home"></IonBackButton>
                </IonButtons>            
              { user && 
                <IonButtons slot = "end">
                  <IonButton color = "danger" onClick={logout}>Log Out</IonButton>
                </IonButtons>
              }
              <IonTitle class = "ion-text-center">Login Application</IonTitle>
            </IonToolbar>
          </IonHeader>
          { user
            ? (
              <IonContent>
                <IonText color='primary'>
                  <h2 className='ion-text-center'>Hello {JSON.parse(localStorage.getItem("user")||"").username},  You have been logged in. </h2>
                </IonText>
              </IonContent>
            )
            : 
            (
              <>
                <IonText color='primary'>
                  <h2 className='ion-text-center'>User Login</h2>
                </IonText>
                <IonGrid fixed={true}>
                  <form className="ion-padding" id = "entryForm" onSubmit={formSubmitAction}>
                  <IonRow>
                      <IonCol>
                        <IonItem>
                          <IonLabel position="floating">Enter Username</IonLabel>
                          <IonInput name = "username" type="text" onIonChange={updateForm} required/>
                        </IonItem>
                      </IonCol>
                  </IonRow>
                  <IonRow>
                      <IonCol>
                        <IonItem>
                          <IonLabel position="floating">Enter Password</IonLabel>
                          <IonInput name = "password" type="password" onIonChange={updateForm} required/>
                        </IonItem>
                      </IonCol>
                  </IonRow>
                  <IonRow class = "ion-justify-content-center">
                    <IonCol sizeMd='4' sizeLg='4' sizeSm='4'>
                      <IonButton className="ion-margin-top" type="submit" expand="block"> Submit </IonButton>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                      <IonCol>
                        <IonToast isOpen = {showToast} color='warning' message = {toastMessage} duration = {3000} onDidDismiss = {() => setShowToast(false)} ></IonToast>
                      </IonCol>
                    </IonRow>    
                  </form>
                </IonGrid>
              </>
              )
            }
        </IonPage>
      );
};

export default LoginForm;
