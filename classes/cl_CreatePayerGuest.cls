public with sharing class cl_CreatePayerGuest {
    @AuraEnabled
    public static String createPayer(String mon,String yr, String cvvn, String crd) {
      String result;

        Guest_Master__c parentObj =  new Guest_Master__c(First_Name__c = 'ABC', Last_Name__c = 'ABC', Email__c = 'abc@gmail.com', Phone__c = '9637963758');
           //Guest_Master__c parentObj =  new Guest_Master__c();
           
            Payment_Master__c pm= new Payment_Master__c();
            pm.Expiry_Month__c= mon;
            pm.Expiry_Year__c= yr;
            pm.CVV__c= cvvn;
            pm.Card_Number__c= crd;
          System.SavePoint dbsaveState = Database.setSavepoint();  
        try{
            
            insert parentObj;
           
            pm.Payer_Details__c= parentObj.Id;
            insert pm;
            result ='record created successfully' + pm;
            
      
        }
        catch(exception e) {

             Database.rollback(dbsaveState);
             throw new AuraHandledException(e.getMessage());
            //result='record failed' + e.getMessage();
        }

          return result;
      }
      
      
      @AuraEnabled(cacheable=true)
        public static void sendEmailToGuest(String mon,String yr,String cv, Integer crd, String tSend, String sub){
            try{
                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                String[] toAddresses = new String[] {tSend};
                mail.setToAddresses(toAddresses);
                mail.setSubject(sub);
                String body = 'Here are your Payment Details  <br/><br/>'  +
                'Expiry Month:' +  mon  + ',<br/><br/>'  +
                'Card Number:'  + crd  +',<br/><br/>'  +
                'Expiry Year:'   + yr   + ', <br/><br/> ' + 
                'CV:'   +   cv   +   ', <br/><br/>'  ;

                mail.setHtmlBody(body);
                Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
                
            }catch(Exception ex){
    
                throw new AuraHandledException(ex.getMessage());
            }
    
        }

    }
