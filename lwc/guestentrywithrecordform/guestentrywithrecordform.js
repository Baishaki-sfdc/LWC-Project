import { LightningElement,track,wire,api } from 'lwc';
import guestEntry from  '@salesforce/apex/cl_CreateGuestRecord.guestEntry'; 
import hotelEntry from  '@salesforce/apex/cl_CreateGuestRecord.hotelEntry'; 

export default class Guestentrywithrecordform extends LightningElement {

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
guestEntry({
    Fname: this.fn,
    Lname: this.ln,
    Mail: this.mail,
    Phonee: this.ph

})
.then(response=>{
    alert(response);

}).catch(error=>{
    alert(error.body.message);
});

hotelEntry({
 Hcity: this.citi,
 Htype: this.SelectedHotelValue
})
.then(response=>{
    alert(response);
}).catch(error=>{
    alert(error.body.message);
});
}
}