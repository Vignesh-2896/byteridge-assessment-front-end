import { IonGrid, IonRow, IonCol, IonButton, IonToast } from "@ionic/react"
import { useState } from "react"

const AuditorFeatures: React.FC = (props) => {

    const [logData, setLogData] = useState([])
    const [pageNumber, setPageNumber] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    let token = JSON.parse(localStorage.getItem("user")||"").token;
    let userID = JSON.parse(localStorage.getItem("user")||"")._id;

    let fetchAuditLogs = async() => {

        let response = await fetch(`http://localhost:4000/auditors/auditCount/${userID}`,{
            headers: { 'Authorization': 'Bearer ' + token }
          });
        let totalCount = await response.json(); // Find the total number of documents.
        setPageCount(Math.ceil(totalCount/10)); // Total number of documents by 10 (limit 10 per page) rounded upwards is our number of pages.

        fetchLogs();

        let divBox = document.getElementById("tableData") as HTMLDivElement;
        divBox.style.display = 'block';
      }

    let fetchLogs = async(pageCounter = 0) => {     // Fetch documents page by page.
        setLogData([])
        setPageNumber(pageNumber + pageCounter)
        let response = await fetch(`http://localhost:4000/auditors/audit/${userID}/${pageNumber + pageCounter}`,{
          headers: { 'Authorization': 'Bearer ' + token }
        });

        let tmpLogData = await response.json();
        tmpLogData.forEach((item, index) => {   // Convert ISO Date to Local String.
            item.logDate = new Date(item.logDate).toLocaleString();
        }); 

        setLogData(tmpLogData);
    }

    let nextPage = async() => { // Fetch the next page's data if possible.
        if(pageNumber === pageCount){
            setShowToast(true);
            setToastMessage("Last Page Reached ! Can't go beyond this.")
        } else {
            await fetchLogs(1);
        }
    }

    let previousPage = async() => { // Fetch the previous page's data if possible.
        if(pageNumber === 1){
            setShowToast(true);
            setToastMessage("First Page Reached ! Can't go beyond this.")
        } else {
            await fetchLogs(-1);
        }
    }

    let hideLogTable = () => {  // Functionality to hide the log table.
        setLogData([]);
        setPageNumber(1);
        setPageCount(1)
        let divBox = document.getElementById("tableData") as HTMLDivElement;
        divBox.style.display = 'none';

    }

return (
        <IonGrid>
            <IonRow class = "ion-justify-content-center">
                <IonCol sizeMd='7' sizeLg='7'>
                    <IonButton expand='block' onClick={fetchAuditLogs} color = 'warning'>Fetch User Log Data</IonButton>
                    <div id = "tableData">
                        <IonGrid>
                            <IonRow>
                            <IonCol class = "table-header ion-text-center">Username</IonCol>
                            <IonCol class = "table-header ion-text-center">User Action</IonCol>
                            <IonCol class = "table-header ion-text-center">User IP</IonCol>
                            <IonCol class = "table-header ion-text-center">Log Data</IonCol>
                            </IonRow>
                            {
                            logData.map((log, logIndex) => { // Loop through each of the documents available.
                                return (
                                <IonRow key = {logIndex}>
                                    {
                                    Object.keys(log).map((logCol,logColIndex) => { // Loop through each element in a document.
                                        return (
                                        <IonCol class = "ion-text-center" key = {logColIndex}>
                                            {log[logCol]} 
                                        </IonCol>
                                        )
                                    })
                                    }
                                </IonRow>
                                )
                            })
                            }
                            <IonRow class = "ion-justify-content-center"> (// Pagination Control)
                                <IonCol sizeMd='2' sizeLg='2'><IonButton expand="block" onClick = {previousPage}>Previous</IonButton></IonCol>
                                <IonCol sizeMd='2' sizeLg='3'><IonButton expand="block" disabled={true}>Current : {pageNumber}</IonButton></IonCol>
                                <IonCol sizeMd='2' sizeLg='2'><IonButton expand="block" onClick = {nextPage} >Next</IonButton></IonCol>
                            </IonRow>
                            <IonRow class = "ion-justify-content-center">
                                <IonCol sizeMd='4' sizeLg='4'><IonButton expand="block" onClick={hideLogTable} >Hide Logs</IonButton></IonCol>
                            </IonRow>
                        </IonGrid>
                        <IonToast isOpen = {showToast} color='warning' message = {toastMessage} duration = {3000} onDidDismiss = {() => setShowToast(false)} ></IonToast>
                    </div>
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

export default AuditorFeatures;