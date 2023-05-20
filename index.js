// A express server, which will handle api requests coming in and respond back with a json, it will use body parser to parse the body of the request and will use the routes defined in the routes folder

// Importing the required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  organization: "org-Wc8W3Ct8Yp9ARQahhF4PM53V",
  apiKey: "<your_api_key>",
});

const openai = new OpenAIApi(configuration);


// Creating an express app
const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: ` 
    ${message}`,
    max_tokens: 10, // que tan larga puede ser la respuesta
    temperature: 0,
  });

  if (response.data) {
    if (response.data.choices[0].text) {
      res.json({ message: response.data.choices[0].text });
    }
  }
});


app.listen(port, () => {
  console.log('Server is running on port: ', port);
});
