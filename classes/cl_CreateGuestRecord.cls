public with sharing class cl_CreateGuestRecord {

    @AuraEnabled
    public static String guestEntry(String Fname ,String Lname,String Mail ,String Phonee) 
       {
        String Result;
       
       try{
        Guest_Master__c gm = new Guest_Master__c();
        gm.First_Name__c=Fname;
        gm.Last_Name__c=Lname;
         gm.Email__c=Mail ;
         gm.Phone__c=Phonee;

         insert gm;
         Result='record created successfully' + gm.Id;
    }

    catch(exception e){
      Result='Record creation failed' + e.getMessage();
    }
    return Result;
   }
    @AuraEnabled
    public static String hotelEntry(String Hcity,String Htype ) 
       {
        String Result;
       
       try{
        Hotel_Master__c hm = new Hotel_Master__c();
        hm.Hotel_City__c= Hcity;
        hm.Hotel_Type__c= Htype;
        

         insert hm;
         Result='record created successfully' + hm.Id;
    }

    catch(exception e){
      Result='Record creation failed' + e.getMessage();
    }
    return Result;
   }



} 
