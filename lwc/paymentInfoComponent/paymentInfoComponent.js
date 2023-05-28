import { LightningElement,api,track } from 'lwc';
    
import createPayer from '@salesforce/apex/cl_CreatePayerGuest.createPayer' ;
//import sendEmailToGuest from '@salesforce/apex/cl_SendEmail.sendEmailToGuest';
import sendEmailToGuest from '@salesforce/apex/cl_CreatePayerGuest.sendEmailToGuest';
import {NavigationMixin} from 'lightning/navigation';

export default class PaymentInfoComponent extends NavigationMixin(LightningElement) {

    @api label;
    @track card;
    @track month;
    @track cvv;
    @track year;
    @track subject = 'Payment Details';
    @track body;
    @track toSend = 'borninapril22@gmail.com';
    @track err;
    @track recc;
    @api precordId;

    handlecard(event){

    this.card=event.target.value;
    }
   handlemonth(event){
    this.month= event.target.value;
   }

   handleyear(event){
    this.year= event.target.value;
   }

   handlecvv(event){
    this.cvv=event.target.value;
   }

   
    createpayerguest(event){
            
      createPayer({
        mon: this.month,
        yr: this.year,
        cvvn: this.cvv,
        crd: this.card
    
    })
    .then(response=>{
        this.precordId = response.Id;
        alert(response);
    
   
  
 })
    
    .catch(error=>{
       // alert(error.body.message);
    });
  
  
    const recordInput = {mon:this.month,yr:this.year,cv:this.cvv,crd:this.card, tSend: this.toSend, sub: this.subject}  //You can send parameters
    sendEmailToGuest(recordInput)
    .then( () => {
        //If response is ok
    }).catch( error => {
        //If there is an error on response
    })
     
    this[NavigationMixin.Navigate]({
        type: "standard__recordPage",
        attributes: {
            objectApiName: "Payment_Master__c", 
            recordId: "this.precordId",
            // objectApiName is optional
            actionName: "view"
        }
    });
  

            
         }
        }
