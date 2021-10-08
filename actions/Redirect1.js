exports.onExecutePostLogin = async (event, api) => {
  console.log('about to perform first redirect');  
  //sending user id to support resending verify email
   api.redirect.sendUserTo(`http://localhost:3000/redirect/firstredirect`, {query: {userid : event.user.user_id}});
   console.log('just performed first redirected');   
};

exports.onContinuePostLogin = async (event, api) => {
  console.log('in first continue');
  console.log(`${event.user.email} is ${event.user.email_verified ? 'verified' : 'unverified'}`, event.user.email_verified);
  api.idToken.setCustomClaim('http://demoapp/verified', event.user.email_verified);
  console.log(event.user);
};