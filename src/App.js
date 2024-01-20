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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

require ('aws-sdk');

// Common Variables for AWS
var Region = "us-east-2";
var IdentityPoolID = "us-east-2:aa3baaa3-c79c-4b4a-95d8-dfc9f7ddd81c";
var translation_output = "your translation"

AWS.config.update({
	region: Region,
	credentials: new AWS.CognitoIdentityCredentials({
	IdentityPoolId: IdentityPoolID
	})
});


//Function to call API

var callAPI = (text, dest_language) =>{
  console.log(text);
  console.log(dest_language);
  var myHeaders = new Headers();
  myHeaders.append("Context-Type", "application/json");
  var raw = JSON.stringify({"text": text, "dest_language": dest_language})
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  //Make api call and get response
  fetch("https://yo6clvqb7i.execute-api.us-east-2.amazonaws.com/dev", requestOptions)
  .then(response => response.text())
  .then(result => {
    alert(JSON.parse(result).body);
    console.log(JSON.parse(result).body);
    translation_output = JSON.parse(result).body["TranslatedText"];
    console.log(translation_output);
    })
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

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);

    console.log(formData.get('input-field'), formData.get("language-choice"));
    callAPI(formData.get('input-field'),formData.get("language-choice"));  
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
      <InputLabel id="demo-simple-select-label">Language</InputLabel>
      <Select
        name="language-choice"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="language"
        onChange={handleChange}
        defaultValue={"fr"}
      >
      <MenuItem value={"fr"}>French</MenuItem>
      <MenuItem value={"de"}>German</MenuItem>
      <MenuItem value={"ja"}>Japanese</MenuItem>
      <MenuItem value={"tr"}>Turkish</MenuItem>
      <MenuItem value={"ru"}>Russian</MenuItem>
      </Select>

      <Typography mt={2}></Typography>
      <Typography align='center'>
      <Button variant="contained" type="submit">Submit for translation</Button>
      </Typography>

  <FormControl fullWidth>
  
</FormControl>


    </form>
    </div>
    <Typography mt={2}></Typography>
    <BlueBar/>
    <Typography mt={2}></Typography>
    <TextField fullWidth 
      name='output-field'
      value={translation_output} 
      id="outlined-basic" 
      label="Translation Result" 
      variant="outlined" />
    <Typography mt={2}></Typography>
    <BlueBar/>
    <Typography mt={2}></Typography>
    
  </Box>
  </Paper>
  
  </>
  );
}