const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();


router.get('/firstredirect', async (req, res, next) => {    
  req.session.redirectState = req.query.state;  
  req.session.userid = decodeURIComponent(req.query.userid);  
  
  res.render('redirect', { title: 'Redirect one' });
});

router.get('/secondredirect', async (req, res, next) => {
  req.session.redirectState = req.query.state;  
  res.render('redirect', { title: 'Redirect two' });
});

router.get('/thirdredirect', async (req, res, next) => {
  req.session.redirectState = req.query.state;  
  res.render('redirect', { title: 'Redirect three' });
});

router.get('/continue', async (req, res, next) => {      
  res.redirect('https://' + process.env.AUTH0_DOMAIN + '/continue' + '?state=' + req.session.redirectState)
});


const getTokenAndSendEmail = async (userid) => {
  const baseUrl = `https://${process.env.AUTH0_DOMAIN}`;
  const tokenRequest = {
    grant_type: 'client_credentials',
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    audience: `${baseUrl}/api/v2/`
  };

  let result = await axios.post(`${baseUrl}/oauth/token`, tokenRequest);
  
  const emailRequest = {
    user_id:userid
  };

  const headers = {
    'Content-Type': 'application/json',
    'authorization': `bearer ${result.data.access_token}`
  }

  result = await axios.post(`${baseUrl}/api/v2/jobs/verification-email`, emailRequest, {headers: headers});
  console.log(result);  
}



router.post('/email', async (req, res, next) => {
  try {    
  const userid = req.session.userid;
  await getTokenAndSendEmail(userid);
  } catch (err) {
    console.log(err);
  }
  res.status(200);
});

router.post('/log', async (req, res, next) => {
  console.log(req.body);
  res.status(200);
});

module.exports = router;