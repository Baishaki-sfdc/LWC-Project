public with sharing class cl_DisplayHotels {
            @AuraEnabled(cacheable=true)
            public static List<Hotel_Master__c>  findHotels(String searchcity,String searchtype) {
        
                String sc = '%' + searchcity +'%';
                String st = '%' + searchtype +'%';
                List<Hotel_Master__c> hotellist=new List<Hotel_Master__c>();
        
              for(Hotel_Master__c hh :[SELECT Id,Name,Hotel_Type__c,Hotel_City__c,Cash_Pay_Availability__c,Cancellation_Availability__c,
              Per__c,WiFi__c FROM Hotel_Master__c WHERE  Hotel_City__c LIKE :sc AND Hotel_Type__c LIKE :st]){
                hotellist.add(hh);
              }
              if(hotellist.size()==0){
                throw new AuraHandledException('No Record Found..'); 
              }
               return hotellist;
              }     

    }
