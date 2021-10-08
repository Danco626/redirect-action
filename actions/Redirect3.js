exports.onExecutePostLogin = async (event, api) => {
  console.log('about to perform third redirect');  
  
   api.redirect.sendUserTo("http://localhost:3000/redirect/thirdredirect");
   console.log('just performed third redirected');
};

exports.onContinuePostLogin = async (event, api) => {
  console.log('in third continue');
};