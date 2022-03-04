import React from 'react'
import {useEffect,useRef, useState} from "react";
import * as ReactDOM from "react-dom";
import { PDFExport,savePDF} from "@progress/kendo-react-pdf";


const FeeReceipt = () => {

    const container = useRef(null);
     const pdfExportComponent = useRef(null);

    const obj = {
        "Transaction_ID": 1,
        "Scholar_Number": 3,
        "Name": "f + l",
        "Payment_type": "Installments",
        "Installment_Number": 1,
        "Amount": 5000,
      };

      const exportPDFWithMethod = () => {
        let element = container.current || document.body;
        savePDF(element, {
          paperSize: "auto",
          margin: 40,
          fileName: `Report for ${new Date().getFullYear()}`,
        });
      };

    // console.log(pdfExportComponent.current);
    // exportPDFWithComponent();

    useEffect(() => {
      exportPDFWithMethod();
    },[])

    return(
       
      <div className="border rounded p-2">
        <PDFExport ref={pdfExportComponent} paperSize="auto" margin={40} fileName={`Payment Receipt`} author="Apni Coaching">
          <div className = "row">
            <div className="col-6">
            <img src="https://res.cloudinary.com/apni-coaching/image/upload/v1645352451/kkc4asovlpivxxreqai0.png" alt="logo" width="50" height="50"/> 
            </div>
            <div className="col-6">
            <h4 className="text-center">Apni Coaching</h4>
            <p fontSize = "10%" className="text-center">NIT JALANDHAR <br/> 144011, Jalandhar, Punjab, India</p>
            </div>
          </div>
          <div>
          <hr ref = {container} className="k-hr" />
            <h3 className="text-center">Payment Receipt</h3>
            <hr className="k-hr" />
            <table className ="table">
  
  <tbody>
   <tr>
   <td>Transaction ID</td>
   <td>{obj.Transaction_ID}</td>
   </tr>
   <tr>
   <td>Scholar Number</td>
   <td>{obj.Scholar_Number}</td>
   </tr>
   <tr>
   <td>Name</td>
   <td>{obj.Name}</td>
   </tr>
   <tr>
   <td>Payment Type</td>
   <td>{obj.Payment_type}</td>
   </tr>
   <tr>
   <td>Installment Number</td>
   <td>{obj.Installment_Number}</td>
   </tr>
   <tr>
   <td>Amount</td>
   <td>{obj.Amount}</td>
   </tr>
  </tbody>
</table>
          </div>
        </PDFExport>
      </div>
    )
}

export default FeeReceipt ;

