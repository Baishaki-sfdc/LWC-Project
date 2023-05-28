public with sharing class cl_SendEmail {
    @AuraEnabled
    public static void sendEmailToGuest(String b, String tSend, String sub){
        try{
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            String[] toAddresses = new String[] {toSend};
            mail.setToAddresses(toAddresses);
            mail.setSubject(subject);
            mail.setHtmlBody('<h1>'+ body + '</h1>');
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
            
        }catch(Exception ex){

            throw new AuraHandledException(ex.getMessage());
        }

    }
}