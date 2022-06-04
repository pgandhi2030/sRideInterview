// 1. Create node API from scratch which reads the mentioned Json via API call 
// https://jsonkeeper.com/b/N9OS 

// 2. If the difference between the current date and created date in Json is prime, 
// it should add a new Boolean flag isPrime with a true value in the Json object     

// 3. If the current date is not prime, then it will add Boolean flag isPrime with a false value 

// 4. Segregate the data based on tag name while sending the response

const express = require('express')
const server = new express();
const axios = require('axios');
const moment = require('moment');

const checkPrime = (number) => {
    if (number > 2) {
        for (let i = 2; i <= Math.sqrt(number); i++) {
            if (number % i == 0) {
                return false
            }
        }
        return true
    } else {
        return true
    }
}

server.get("/getData", async (req, res) => {

    const responseData = {}
    const responseFromApi = await axios.get("https://jsonkeeper.com/b/N9OS",)

    responseFromApi.data.map((data) => {
        const difference = moment().diff(moment(data.createdAt), 'days');
        data.isPrime = checkPrime(difference)
        if (data.tag) {
            responseData[data.tag.name] ? responseData[data.tag.name].push(data) : responseData[data.tag.name] = [data]
        } else {
            responseData["Other"] ? responseData["Other"].push(data) : responseData["Other"] = [data]
        }
    })
    res.status(200).send(responseData)
})

server.listen(3000, () => {
    console.log("server is running on port 3000")
})

