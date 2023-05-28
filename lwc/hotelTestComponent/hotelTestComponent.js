import { LightningElement,track,wire,api } from 'lwc';
//import findHotels from '@salesforce/apex/cl_SearchHotel.findHotels';
import findHotels from '@salesforce/apex/cl_DisplayHotels.findHotels';
import {NavigationMixin} from 'lightning/navigation';

export default class HotelTestComponent extends NavigationMixin(LightningElement) {
@track searchtext='';
@track searchtxt='';
@track recc;
@track err='';
@track searchdata;
@track errmsg='';
@track varbool=false;

 @track columns = [
    {
        label: 'Hotel Code',
        fieldName: 'Name',
        type:'text'
    }, {
        label: 'Hotel City',
        fieldName: 'Hotel_City__c',
        type:'text'
    }, {
        label: 'Cash Pay Availability',
        fieldName: 'Cash_Pay_Availability__c',
        type: 'text',
    }, {
        label: 'Cancel Availability',
        fieldName: 'Cancellation_Availability__c',
        type: 'text'
    },
       {
        label: 'Per Day Cost',
        fieldName: 'Per__c',
        type: 'text'
    
    
    },{

        label: 'Hotel Type',
        fieldName: 'Hotel_Type__c',
        type: 'text'
    

    }

];

searchme(event){
    this.err='';
 this.searchtext= event.target.value;
 this.varbool=true;
}
 searchmee(event){
   this.errmsg='';
   this.searchtxt= event.target.value;
   this.varbool=true;
 }
 //handleSelection(event){
    //this.SelectedHotelValue= event.target.value;
//}

//handlesearchme(event){
    @wire(findHotels,{searchcity:'$searchtext',searchtype:'$searchtxt'})
        hotels({data,error}){
        if(data)
  {
    this.recc=data;
  }

  else if (error)
  { this.err=error;
    this.recc=undefined;
  }
}
  
navigateToPaymentInfo(event) {
    event.preventDefault();
    let componentDef = {
        componentDef: "c:paymentInfoComponent",
        attributes: {
           
        }
    };
      // Encode the componentDefinition JS object to Base64 format to make it url addressable
      let encodedComponentDef = btoa(JSON.stringify(componentDef));
      this[NavigationMixin.Navigate]({
          type: 'standard__webPage',
          attributes: {
              url: '/one/one.app#' + encodedComponentDef
          }
      });
  }


    }



        