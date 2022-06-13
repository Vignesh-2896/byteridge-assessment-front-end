import { IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButton, IonButtons, IonBackButton, IonText, IonItem, IonLabel, IonInput, IonCheckbox, IonToast } from '@ionic/react';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import './Home.css';

const RegisterForm: React.FC = () => {

    const [form, setForm] = useState({  // State to hold values of input fields.
        firstName : "",
        lastName : "",
        username : "",
        password : "",
        userAuditor : false
      });

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const history = useHistory();

    useEffect(() => {
      if(localStorage.getItem("user")){ // If user is present in local storage, redirect to home page.
        history.push("/");
      }
    }, []);

    const updateForm = (e:any) => { // Update state when each input field is changed.
        setForm({...form, [e.currentTarget.name]:e.currentTarget.value})
    }
    
    const updateCheckbox = (e:any) => { // Update state when check box is changed.
        let newValue = !form.userAuditor;
        setForm({...form, [e.currentTarget.name]:newValue});
    }
    
    let formSubmitAction = async(e:any) => {  // Form submission operation.
        e.preventDefault();
        let response  = await fetch("http://localhost:4000/users/register",{
            method : 'POST',
            mode:'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        });
        response = await response.json();
        setToastMessage(response.toString());
        setShowToast(true);
    }

    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                  <IonBackButton defaultHref="home"></IonBackButton>
                </IonButtons>            
              <IonTitle class = "ion-text-center">Login Application</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonText color='primary'>
            <h2 className='ion-text-center'>Enter User Details</h2>
          </IonText>
          <IonGrid fixed={true}>
            <form className="ion-padding" id = "entryForm" onSubmit={formSubmitAction}>
             <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating">Enter First Name</IonLabel>
                    <IonInput name = "firstName" type="text" onIonChange={updateForm} required/>
                  </IonItem>
                </IonCol>
             </IonRow>
             <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating">Enter Last Name</IonLabel>
                    <IonInput name = "lastName" type="text" onIonChange={updateForm} required/>
                  </IonItem>
                </IonCol>
             </IonRow>
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
             <IonRow>
                <IonCol>
                  <IonLabel>Auditor Powers : </IonLabel>
                  <IonCheckbox name = "userAuditor" onIonChange={updateCheckbox}/>
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
        </IonPage>
      );
};

export default RegisterForm;
