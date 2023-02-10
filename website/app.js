
/* Global Variables */
let baseUrl='https://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const apiKey = ',&appid=65c06a5deac83c135040266d74547396&units=metric';
// generate key
const generate = document.getElementById('generate');
// server url
const url = "http://localhost:8080";
	
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// GET request to the OpenWeatherMap API.
      

function getData(e){
    let zipCode = document.getElementById('zip').value ;
    let userFeeling = document.getElementById('feelings').value;

getTemp(baseUrl,zipCode, apiKey)

.then(function(data){

// add data to post request
postData(url+'/add', {temp:data.main.temp, date: newDate, content:userFeeling} )
 
// Function which updates UI

    retrieveData()

})

}
generate.addEventListener('click',getData);

const getTemp = async (baseUrl, zipCode, apiKey)=>{

  const res = await fetch(baseUrl+zipCode+apiKey)
  try {

    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error");
  }
}




// post data
const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }
      catch(error) {
      console.log("error");
      }
  }



// retrieve Data
const retrieveData = async () =>{
    const request = await fetch(url+'/all');
    try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById('temp').innerHTML = "Temperature is " +Math.round(allData.temp)+ ' degrees';
    document.getElementById('content').innerHTML = "Feeling is " +allData["userFeeling"];
    document.getElementById("date").innerHTML ="Date is " +allData.date;
    }
    catch(error) {
      console.log("error");
    }
   }

