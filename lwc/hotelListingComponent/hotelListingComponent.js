import { LightningElement,track,wire,api } from 'lwc';
import findHotels from '@salesforce/apex/cl_SearchHotel.findHotels';
import displayHotels from '@salesforce/apex/cl_SearchHotel.displayHotels';
import { getPicklistValues,getObjectInfo } from 'lightning/uiObjectInfoApi';
import HOTEL_OBJECT from '@salesforce/schema/Hotel_Master__c';
import HOTEL_FIELD from '@salesforce/schema/Hotel_Master__c.Hotel_Type__c';

const cols = [
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
export default class HotelListingComponent extends LightningElement {

@track searchtext='';
@track searchtxt='';
@track recc;
@track err='';
@track searchdata;
@track errmsg='';
@track selectedHotelVal;
columns= cols;
@track l_All_Types;
    @track hotelOptions;
    @wire(getObjectInfo,{objectApiName:HOTEL_OBJECT})
    objectInfo;
    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: HOTEL_FIELD})
    hotelOptions;
    @wire(displayHotels,{searchtype:'$selectedHotelVal'})
     wiredHotel({error,data}){
        if (data) {
            alert('the data sent is:' + data);
            this.searchdata=data;
            
            this.errors=undefined;
                 
           
        } else {
           this.errmsg=error;
           this.searchdata=undefined;
        }
 
    }
 
    handleSelection(event){
        this.selectedHotelVal = event.target.value; 
       
    }



    




searchme(event){
    this.err='';
 this.searchtext= event.target.value;
}
 //searchmee(event){
   // this.errmsg='';
    //this.searchtxt= event.target.value;
 //}
 //handleSelection(event){
    //this.SelectedHotelValue= event.target.value;
//}

handlesearchme(event){
        if (!this.searchtext ) {
            this.err='please enter city search';
            this.searchtext = undefined;
            return;
        }
            findHotels({
                searchcity: this.searchtext
            })
            .then(result => {
                // set @track contacts variable with return contact list from server  
                this.recc = result;
                this.err=undefined;
            })
            .catch(error => {
                this.err = error;
                this.recc=undefined;
            });
        
        }

}