// React imports
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AWS from 'aws-sdk';
require ('aws-sdk');

// Common Variables for AWS
var Region = "us-east-2";
var IdentityPoolID = "us-east-2:aa3baaa3-c79c-4b4a-95d8-dfc9f7ddd81c";

AWS.config.update({
	region: Region,
	credentials: new AWS.CognitoIdentityCredentials({
	IdentityPoolId: IdentityPoolID
	})
});


//Function to call API

var callAPI = (text) =>{
  var myHeaders = new Headers();
  myHeaders.append("Context-Type", "application/json");
  var raw = JSON.stringify({"text": text})
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  //Make api call and get response
  fetch("https://mwbhfmg0p8.execute-api.us-east-2.amazonaws.com/comprehend-dev-stage", requestOptions)
  .then(response => response.text())
  .then(result => alert(JSON.parse(result).body))
  .catch(error => console.log('error', error));

}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }

function BlueBar() {
  return (
    <Box
      sx={{
        height: 30,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? 'rgba(0, 0, 255, 0.1)'
            : 'rgb(132 132 255 / 25%)',
      }}
    />
  );
}

export default function UserSubmission() {

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    console.log(formData.get('input-field'));
    callAPI(formData.get('input-field'))
  }

  
  return (  
  <>
  <Paper elevation={5}>
      <Box
      sx={{
        display: 'flow',
        margin: 2,
        flexWrap: 'wrap'
      }}
      spacing={3}
      noValidate
      justifyContent={"center"}
      autoComplete="off"
    >
    <Typography mt={2}></Typography>

    <h1>
      Amazon Translate and Polly Project
    </h1>

    <p>
      Enter your text to be translated
    </p>

    {/* accept user input */}
    <div>
    <form method="post" onSubmit={handleSubmit}>

      <TextField fullWidth name='input-field' id="outlined-basic" label="Your input" variant="outlined" />
      <Typography mt={2}></Typography>
      <BlueBar/>
      <Typography mt={2}></Typography>
      <Typography align='center'>
      <Button variant="contained" type="submit">Submit for sentiment analysis</Button>
      </Typography>
    </form>
    </div>
    <Typography mt={2}></Typography>
    <BlueBar/>
    <Typography mt={2}></Typography>
    <TextField fullWidth name='output-field' id="outlined-basic" label="Translation Result" variant="outlined" />
    <Typography mt={2}></Typography>
    <BlueBar/>
    <Typography mt={2}></Typography>
    
  </Box>
  </Paper>
  
  </>
  );
}