import { LightningElement,track } from 'lwc';
import {createRecord} from 'lightning/uiRecordApi';
import HOTEL_OBJECT from '@salesforce/schema/Hotel_Master__c';

export default class Guestentryform extends LightningElement {
  @track  fn;
  @track ln;
  @track ph;
  @track mail;
  @track indate;
  @track outdate;
  @track adults;
  @track children;
  @track citi;
  value='';

  fname(event){
    this.fn=event.target.value;

  }

 lname(event){
    this.ln=event.target.value;

 }
 callphone(event){
    this.ph=event.target.value;
 }
callemail(event){
    this.mail=event.target.value;
}
callcheckin(event){
    this.indate=event.target.value;

}
callcheckout(event){
  this.outdate=event.target.value;
}
calladults(event){
this.adults= event.target.value;
}
callcity(event){

this.citi = event.target.value;
}
callchild(event){
  this.children= event.target.value;
}
hotelOptions=[
    { value:'3 star',label:'3-Star',description:'3-star hotel'},
    {value:'4 star', label:'4-Star',description:'4-star hotel'},
    {value:'5 star', label:'5-Star',description:'5-star hotel'},
    
];
handleSelection(event){
    this.SelectedHotelValue= event.target.value;
}
createGuest(event){
  const fields={'First_Name__c':this.fn,'Last_Name__c':this.ln,'Phone__c':this.ph,'Email__c':this.mail,
  'Hotel_City__c':this.citi,'Hotel_Type__c':this.SelectedHotelValue};
  var objRecordInput={apiName: 'Guest_Master__c','Hotel_Master__c',fields};
 createRecord(objRecordInput).then(response => {
  console.log(response);
  alert('record created successfully: ' + response.id);
  
 }).catch(error=>{
   alert('error' + JSON.stringify(error));
 });

 //const fields1={'Hotel_City__c':this.citi,'Hotel_Type__c':this.SelectedHotelValue};
 //var RecordInputt ={'apiName': 'Hotel_Master__c',fields1};
 //createRecord(RecordInputt).then(response => {
  //console.log(response);
  //alert('record created successfully: ' + response.id);
  
// }).catch(error=>{
   //alert('error' + JSON.stringify(error));
 //});
 }
}