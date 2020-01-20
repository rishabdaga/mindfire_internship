//To remove extra spaces from the input string

function removeSpace(string) {
    return string.split(' ').join("");
}

//To print the error message

function printError(elementId, errorMessage) {
    document.getElementById(elementId).innerHTML = errorMessage;
}

function formValidate() {

    var firstName = document.forms["registrationForm"]["firstName"].value;
    var middleName = document.forms["registrationForm"]["middleName"].value;
    var lastName = document.forms["registrationForm"]["lastName"].value;
    var gender = document.forms["registrationForm"]["gender"].value;
    var email = document.forms["registrationForm"]["email"].value;
    var phone1 = document.forms["registrationForm"]["phone1"].value;
    var phone2 = document.forms["registrationForm"]["phone2"].value;
    var password = document.forms["registrationForm"]["password"].value;
    var confirmPassword = document.forms["registrationForm"]["confirmPassword"].value;
    var currentAddress = document.forms["registrationForm"]["currentAddress"].value;
    var permanentAddress = document.forms["registrationForm"]["permanentAddress"].value;
    var city = document.forms["registrationForm"]["city"].value;
    var state = document.forms["registrationForm"]["state"].value;
    var country = document.forms["registrationForm"]["country"].value;
    var subscription = document.forms["registrationForm"]["subscription"].checked;
    var termCond = document.forms["registrationForm"]["t&c"].checked;

    //variables for the each field error are set to true

    var errFullName = errMiddleName = errLastName = errGender = errEmail = true;
    var errPhone1 = errPhone2 = errPass = errCPass  = errAdd2 = true;
    var errCity = errState = errCountry =  errSubs = errT_C = errCaptcha = true;

    var errorText = [];
    var txt = "";

    //function to print error comments in lists

    function printValue(value){
        txt += "<li>" + value + "</li>"; 
    }

    //Checking validity for first name

    firstName = removeSpace(firstName);
    if (firstName === "") {
        errorText.push("Fill the First Name Field.");
    }
    else {
        var regex = /^[a-zA-Z]+$/;
        if (!regex.test(firstName)) {
            errorText.push("Avoid using space or digits or special character in first name.");
        }
        else {
            errFullName = false;
        }
    }

    //Checking validity for middle name

    middleName = removeSpace(middleName);
    if (/^[a-zA-Z]+$/.test(middleName) || middleName === "") {
        errMiddleName = false;
    }
    else {
        errorText.push("Middle name cannot contain special character.");
    }

    //Checking validity for last name

    lastName = removeSpace(lastName);
    if (lastName == "") {
        errorText.push("Fill the Last Name Field.");
    }
    else {
        var regex = /^[a-zA-Z]+$/;
        if (!regex.test(lastName)) {
            errorText.push("Avoid using space or digits or special character in last name.");
        }
        else {
            errLastName = false;
        }
    }
    txt = "<ul>";
    errorText.forEach(printValue);
    txt += "</ul>";
    printError("errorFullName", txt);

    //....................................................................
    //checking gender select error

    errorText = [];
    txt = "";
    if (gender === "") {
        errorText.push("Choose any field.");
    }
    else {
        errGender = false;
    }
    txt = "<ul>";
    errorText.forEach(printValue);
    txt += "</ul>";
    printError("errorBasicDetails", txt);

    //......................................................................
    //checking emails and contact numbers


    errorText = [];
    txt = "";
    if (email === "") {
        errorText.push("Email field cannot be blank.");
    }
    else {
        var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]+$/;
        if (regex.test(email)) {
            errEmail = false;
        }
        else{
            errorText.push("Email is not in correct format.");
        }
    }
    if (phone1 === ""){
        errorText.push("Primary Contact needs to be filled.");
    }
    else {
        if (phone1.length != 10){
            errorText.push("Enter ten digit Contact Number in primary number.");
        }
        else {
            errPhone1 = false;
        }
    }
    if (phone2.length == 0 || phone2.length == 10 ){
        errPhone2 = false;
    }
    else {
        errorText.push("Enter ten digit Contact Number in primary number.");
    }
    txt = "<ul>";
    errorText.forEach(printValue);
    txt += "</ul>";
    printError("errorContact", txt);

    //...........................................................................
    //checking for password

    errorText = [];
    txt = "";
    if (password.length < 6){
        errorText.push("Password must be atleast six characters.");
    }
    else {
        if (password === confirmPassword){
            errPass = errCPass =false;
        }
        else{
            errorText.push("Password & Confirm Password needs to be same.");
        }
    }
    txt = "<ul>";
    errorText.forEach(printValue);
    txt += "</ul>";
    printError("errorPrivacy", txt);
    
    //.........................................................................
    //checking address,city,state,country

    errorText = [];
    txt = "";
    if (permanentAddress === ""){
        errorText.push("Address cannot be null.");
    }
    else {
        errAdd2 = false;
    }
    if (city === ""){
        errorText.push("City cannot be null.");
    }
    else{
        errCity = false;
    }
    if (state === ""){
        errorText.push("Select State.");
    }
    else{
        errState = false;
    }
    if (country === ""){
        errorText.push("Select Country.");
    }
    else{
        errCountry = false;
    }
    if (subscription) {
        errSubs = false;
    }
    else {
        errorText.push("Subscribe Newsletter.");
    }
    txt = "<ul>";
    errorText.forEach(printValue);
    txt += "</ul>";
    printError("errorAddress", txt);
    
    //...................................................................
    //checking captcha and terms and conditions
    
    errorText = [];
    txt = "";
    if (termCond) {
        errT_C = false;
    }
    else {
        errorText.push("Accept Terms & Conditions.");
    }
    if (validateCaptcha()) {
        errCaptcha = false;
    }
    else {
        errorText.push("Retry Captcha.");
    }
    txt = "<ul>";
    errorText.forEach(printValue);
    txt += "</ul>";
    printError("errorCaptcha", txt);
    
    //.................................................
    //verifying all error fields 

    if (errFullName || errMiddleName || errLastName || errEmail || errGender || 
    errPhone2 || errPhone1 || errPass || errCPass || errAdd2 || errCity || errState
    || errCountry || errT_C || errSubs === true ){
        alert("Wrong Inputs!!    Please follow the highlighted Instruction");
        return false;   
    }
    else {
        alert("Submitted Successfully!");
        location.replace("registration_form.html");
    }
}

//function to generate captcha

function generateCaptcha(){
    var operatorArray = ["+", "-", "/", "*"];
    var maxNum = 99;
    var operand1 = Math.ceil(Math.random() * maxNum);
    var operand2 = Math.ceil(Math.random() * maxNum);
    var operator = operatorArray[Math.floor(Math.random() * 4)];
    var captchaAns = 0;
    var captchaCode="";
    if (operand1 > operand2) {
        captchaCode = operand1 + " " + operator + " " + operand2;
        captchaAns = calculateCaptcha(operand1,operand2,operator);
    }
    else {
        captchaCode = operand2 + " " + operator + " " + operand1;
        captchaAns = calculateCaptcha(operand2,operand1,operator);
    }
    document.getElementById("captchaAnswer").value = captchaAns;
    document.getElementById("questionCaptcha").innerHTML = captchaCode;
    
}

//function to calculate captcha

function calculateCaptcha(a,b,c){
    var result=0;
    switch (c) {
        case "+":
            result = a + b;
            break;
        case "*":   
            result = a * b;
            break;
        case "/":   
            result = Math.floor(a / b);
            break;
        case "-":   
            result = a - b;
            break;
        default:    
            result = 0;
    }
    return result;
}

//function to validate captcha

function validateCaptcha(){
    var captchaAns = document.getElementById("captchaAnswer").value;
    var inputAns = document.getElementById("lblInputCaptchaValue").value;
    if (captchaAns == inputAns) {
        return true;
    }
    else {
        generateCaptcha();
    }
}
