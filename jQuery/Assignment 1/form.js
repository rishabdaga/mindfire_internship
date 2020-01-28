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
    $("#captchaAnswer").val(captchaAns);
    $("#questionCaptcha").text(captchaCode);
    
}

//function to calculate the value of captcha 

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
    var captchaAns = $("#captchaAnswer").val();
    var inputAns = Number($("#lblInputCaptchaValue").val());
    if (captchaAns == inputAns) {
        return true;
    }
    generateCaptcha();
}

//.............................................................................

$( document ).ready(function() {
    generateCaptcha();
    $(".captcha").hide();
    $("#submit").hide();

    $("#proceed").click(function(){
        $("#proceed").hide();
        $(".captcha").show(1500, function(){
            $("#submit").show();
        });
    })

    $("#captchaRefresh").click(function(){
        generateCaptcha();
    });

    //To disable and enable the input field according to the country

    $("#lblCountry").change(function(){
        if ($("#lblCountry").val() !== "India") {
            $("#lblState").prop("disabled", true);
            $("#lblCity").prop("disabled", true);
            $("#lblState").val("");
            $("#lblCity").val("");
        }
        else{
            $("#lblState").prop("disabled", false);
            $("#lblCity").prop("disabled", false);
            
        }
    });

    //verification of the fields 

    $( "#submit" ).click(function(event){
        var firstName = $("#lblFirstName").val();
        var middleName = $("#lblMiddleName").val();
        var lastName = $("#lblLastName").val();
        var gender = $("input[name='gender']:checked").val();
        var dob =  $("#lblDOB").val();
        var email = $("#lblEmail").val();
        var phone1 = $("#lblPrimaryNumber").val();
        var phone2 = $("#lblAlternateNumber").val();
        var password = $("#lblPassword").val();
        var confirmPassword = $("#lblConfirmPassword").val();
        var currentAddress = $("#lblCurrentAddress").val();
        var permanentAddress = $("#lblPermanentAddress").val();
        var city = $("#lblCity").val();
        var state = $("#lblState").val();
        var country = $("#lblCountry").val();
        var subscription = $("#lblSubscription").prop("checked");

        var errFullName = errMiddleName = errLastName = errGender = errEmail = true;
        var errPhone1 = errPhone2 = errPass = errCPass  = errAdd2 = true;
        var errCity = errState = errCountry =  errSubs = errDOB = errCaptcha = true;

        var errorText = [];
        var txt = "";

        var p1 = Number(phone1);
        var p2 = Number(phone2);

        //function to print error comments in lists

        function printValue(value){
            txt += "<li>" + value + "</li>"; 
        }

        //Checking validity for first name

    
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

 
        if (/^[a-zA-Z]+$/.test(middleName) || middleName === "") {
            errMiddleName = false;
        }
        else {
            errorText.push("Middle name cannot contain special character.");
        }

        //Checking validity for last name

    
        if (lastName == "") {
            errorText.push("Fill the Last Name Field.");
        }
        else {
            var regex = /^[a-zA-Z]+/;
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
        $("#errorFullName").html(txt);

        //.....................................................................
        //checking baisc details


        errorText = [];
        txt = "";
        if (gender === undefined) {
            errorText.push("Choose any field.");
        }
        else {
            errGender = false;
        }
        if (dob === "") {
            errorText.push("Date of Birth cannot be blank.");
        }
        else {
            errDOB = false;
        }
        txt = "<ul>";
        errorText.forEach(printValue);
        txt += "</ul>";
        $("#errorBasicDetails").html(txt);

    

        //......................................................................
        //checking emails and contact numbers


        errorText = [];
        txt = "";
        if (email === "") {
            errorText.push("Email field cannot be blank.");
        }
        else {
            var regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]+/;
            if (regex.test(email)) {
                errEmail = false;
            }
            else{
                errorText.push("Email is not in correct format.");
            }
        }
    
        if (phone1 === 0){
            errorText.push("Primary Contact needs to be filled.");
        }
        else {
            if (phone1.length != 10 || p1 === NaN){
                errorText.push("Enter ten digit Contact Number in primary number.");
            }
            else {
                errPhone1 = false;
            }
        }
        if (phone2.length == 0){
            errPhone2 = false;
        }
        else {
            if (phone2.length != 10 || p2 == NaN){
                errorText.push("Enter ten digit Contact Number in alternate number.");
            }
            else {
                errPhone2 = false;
            }
        }
        txt = "<ul>";
        errorText.forEach(printValue);
        txt += "</ul>";
        $("#errorContact").html(txt);

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
        $("#errorPrivacy").html(txt);
        
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
        if (country === ""){
            errorText.push("Select Country.");
        }
        else{
            if (country === "India") {
                if (city === ""){
                    errorText.push("City cannot be null.");
                }
                else {
                    errCity = false;
                }
                if (state === ""){
                    errorText.push("Select State.");
                }
                else {
                    errState = false;
                }    
            }
            else {
                errCity = false;
                errState = false;
            }
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
        $("#errorAddress").html(txt);

        //checking of captcha 

        errorText = [];
        txt = "";
        if (validateCaptcha()) {
            errCaptcha = false;
        }
        else {
            errorText.push("Retry Captcha.");
        }
        txt = "<ul>";
        errorText.forEach(printValue);
        txt += "</ul>";
        $("#errorCaptcha").html(txt);


        if (errFullName || errMiddleName || errLastName || errEmail || errGender || 
        errPhone2 || errPhone1 || errPass || errCPass || errAdd2 || errCity || errState
        || errCountry || errDOB || errCaptcha || errSubs === true ){
            alert("Wrong Inputs!! Please follow the highlighted Instruction ");
            generateCaptcha();
            $("#lblInputCaptchaValue").val("");
            return false;   
        }
        else {
            alert("Submitted Successfully!");
            location.replace("registration_form.html");
        }
    });

});