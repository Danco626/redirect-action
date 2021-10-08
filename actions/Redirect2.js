exports.onExecutePostLogin = async (event, api) => {
  console.log('about to perform second redirect');
  //console.log(`${event.user.email} is ${event.user.email_verified ? 'verified' : 'unverified'}`, event.user.email_verified);
  
   api.redirect.sendUserTo("http://localhost:3000/redirect/secondredirect");
   console.log('just performed second redirected');
};

exports.onContinuePostLogin = async (event, api) => {
  console.log('in second continue');
};