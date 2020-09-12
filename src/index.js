const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here

app.get("/", (req, res) => {
    res.json({
        status: "success",
        message: "Hello world!"
    });
})

function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}
app.post("/add", (req, res) => {
    const { num1, num2 } = req.body;
    if (typeof num1 == "string" || typeof num2 == "string") {
        return res.json({
            status: "failure",
            message: "Invalid data types"
        });
    }
    const tempResult = parseFloat(num1) + parseFloat(num2);
    if (tempResult > 1000000 || num1 > 1000000 || num2 > 1000000) {
        return res.json({
            status: "failure",
            message: "Overflow"
        })
    }
    return res.json({
        status: "success",
        message: "the sum of given two numbers",
        sum: tempResult
    })

})

app.post("/sub", (req, res) => {
    const { num1, num2 } = req.body;
    if (typeof num1 == "string" || typeof num2 == "string") {
        return res.json({
            status: "failure",
            message: "Invalid data types"
        });
    }
    const tempResult = parseFloat(num1) - parseFloat(num2);

    if (tempResult < -1000000) {
        return res.json({
            status: "failure",
            message: "Underflow"
        })
    }
    return res.json({
        status: "success",
        message: "the difference of given two numbers",
        difference: tempResult
    })

})

app.post("/multiply", (req, res) => {
    const { num1, num2 } = req.body;
    if (typeof num1 == "string" || typeof num2 == "string") {
        return res.json({
            status: "failure",
            message: "Invalid data types"
        });
    }
    const tempResult = parseFloat(num1) * parseFloat(num2);
    if (tempResult > 1000000) {
        return res.json({
            status: "failure",
            message: "Overflow"
        })
    }
    return res.json({
        status: "success",
        message: "The product of given numbers",
        result: tempResult
    });

})

app.post("/division", (req, res) => {
    const { num1, num2 } = req.body;
    if (num2 === 0) {
        return res.json({
            message: "Cannot divide by zero"
        })
    }
    const tempResult = parseFloat(num1) / parseFloat(num2);

    if (tempResult > 1000000) {
        return res.json({
            status: "error",
            message: "Overflow"
        })
    }

    return res.json({
        status: "success",
        message: "The division of given numbers",
        result: tempResult
    })

})



// here


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;