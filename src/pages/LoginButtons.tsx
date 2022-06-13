import { IonGrid, IonRow, IonCol, IonButton } from "@ionic/react"

const LoginButtons: React.FC = () => {
    return (
    <IonGrid>
        <IonRow class = "ion-justify-content-center">
            <IonCol sizeMd='4' sizeLg='4'>
                <IonButton class = "ion-margin" expand='block' href = "/login">Login</IonButton>
                <IonButton class = "ion-margin" expand='block' href = "/register">Register</IonButton>
            </IonCol>
        </IonRow>
    </IonGrid>
    )
}

export default LoginButtons;