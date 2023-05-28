public with sharing class cl_SearchHotel {
    @AuraEnabled(cacheable=true)
    public static List<Hotel_Master__c>  findHotels(String searchcity) {

        String sc = '%' + searchcity +'%';
        
        List<Hotel_Master__c> hotellist=new List<Hotel_Master__c>();

      for(Hotel_Master__c hh :[SELECT Id,Name,Hotel_Type__c,Hotel_City__c,Cash_Pay_Availability__c,Cancellation_Availability__c,
      Per__c,WiFi__c FROM Hotel_Master__c WHERE  Hotel_City__c LIKE :sc]){
        hotellist.add(hh);
      }
    

    if(hotellist.size()==0){
      throw new AuraHandledException('No Record Found..'); 
    }
     return hotellist;
    }
    @AuraEnabled(cacheable=true)
     public static List<Hotel_Master__c> displayHotels(String searchtype){
      String st = '%' + searchtype +'%';
        try {
          List<Hotel_Master__c> returnlist = new List<Hotel_Master__c>();
             
           for(Hotel_Master__c h :[SELECT Id,Name,Hotel_Type__c,Hotel_City__c,Cash_Pay_Availability__c,Cancellation_Availability__c,
      Per__c,WiFi__c FROM Hotel_Master__c WHERE  Hotel_City__c LIKE :st]){
        returnlist.add(h);
      }
            return returnlist;
        } catch (Exception e) {
            System.debug('Exception: '+e.getMessage());
            return null;
        }
    }
}