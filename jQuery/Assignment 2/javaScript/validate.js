//global declaration for each field is having an error as true

var errFirstName = errMiddleName = errLastName = errGender = errDOB = errEmail = errPhone = true;
var errPanNumber = errAadharNumber = errAddress = errProfilePicture = errCaptcha = true;

//global variables to store all dyanmic field values.

var phone, street, country, state, city, pinCode;

//on click of register button 

$( document ).ready(function(){
    generateCaptcha();
})

$( "form" ).submit(function( event ) {
    event.preventDefault();
    firstnameValidation();
    middleNameValidation();
    lastNameValidation();
    genderFieldValidation();
    dateOfBirthValidation();
    emailValidation();
    phoneNumbervalidation();
    addressValidation();
    aadhaarValidation();
    panValidation();
    imageValidation();
    captchaValidation();

    if (errFirstName || errMiddleName || errLastName || errGender || errDOB || errEmail || errPhone ||
    errPanNumber || errAadharNumber || errAddress || errCaptcha || errProfilePicture ){
        $(".modal").css("display","block");
        generateCaptcha();
    }
    else {
        $(".container").attr("hidden",true);
        $(".resume").attr("hidden",false);
        var name = $.trim($( "#txtFirstName" ).val()) + " " + $.trim($( "#txtMiddleName" ).val()) + " " +$.trim($( "#txtLastName" ).val());
        var email = $.trim($("#txtEmail").val());
        var gender = $("input[name='gender']:checked").val();
        var aadhaarNumber = $.trim($("#txtAadhaarCard").val());
        var panNumber = $.trim($("#txtPanNumber").val());
        var ph = "";
        var dob = $("#dateDOB").val();
        var addressArray = [];
        var address = "<ul>";
        phone.forEach(function(value){
            ph += value + " ";
        })
        for (i = 0; i < street.length; i++){
            var add = "";
            add = street[i] + ",<br>" + city[i] + ", " + state[i] + "-" + pinCode[i] + ", " + country[i];
            addressArray.push(add);
        }
        
        addressArray.forEach(function(value){
            address += "<li>" + value + "</li>";

        })
        address += "</ul>";
        $("#name").text(name);
        $("#email").text(email);
        $("#phone").text(ph);
        $("#dob").text(dob);
        $("#gender").text(gender);
        $("#aadhaarNumber").text(aadhaarNumber);
        $("#panNumber").text(panNumber);
        $("#address").html(address);
    }
})
$(".close").click(function() {
    $(".modal").css("display","none");
})

$( "#txtFirstName" ).blur(function(){
    firstnameValidation();
})
$( "#txtMiddleName" ).blur(function(){
    middleNameValidation();
})
$( "#txtLastName" ).blur(function(){
    lastNameValidation();
})
$( "#dateDOB" ).blur(function(){
    dateOfBirthValidation();
})
$( "#txtEmail" ).blur(function(){
    emailValidation();
})
$( "#txtAadhaarCard" ).blur(function(){
    aadhaarValidation();
})
$( "#txtPanNumber" ).blur(function(){
    panValidation();
})


function firstnameValidation() {
    $("#txtFirstName").next().html("");
    var firstName = $.trim($( "#txtFirstName" ).val());
    if ( firstName === "" ) {
        $("#txtFirstName").next().html("Please fill the First Name");
        errFirstName = true;
    }
    else {
        var regex = /^[a-zA-Z]+$/;
        if (!regex.test(firstName)) {
            $("#txtFirstName").next().html("First Name cannot contain special charcters.");
            errFirstName = true;
        }
        else {
            errFirstName = false;
        }
    }
}
function middleNameValidation(){
    $("#txtMiddleName").next().html("");
    var middleName = $.trim($( "#txtMiddleName" ).val());
    var regex = /^[a-zA-Z]+$/;
    if (regex.test(middleName) || middleName === "") {
        errMiddleName = false;
    }
    else {
        $(this).next().html("Middle name cannot contain special characters.");
        errMiddleName = true;
    }
}
function lastNameValidation(){
    $( "#txtLastName" ).next().html("");
    var lastName = $.trim( $( "#txtLastName" ).val() );
    if ( lastName === "" ) {
        $("#txtLastName").next().html("Please fill the Last Name");
        errLastName = true;
    }
    else {
        var regex = /^[a-zA-Z]+$/;
        if (!regex.test(lastName)) {
            $("#txtLastName").next().html("Last Name cannot contain special charcters.");
            errLastName = true;
        }
        else {
            errLastName = false;
        }
    }
}
function genderFieldValidation(){
    var gender = $("input[name='gender']:checked").val();
    if (gender === undefined){
        $(".radio-buttons").next().html("Please select any one of these.");
    }
    else {
        errGender = false;
    }
}
function dateOfBirthValidation(){
    $("#dateDOB").next().html("");
    var dob = $("#dateDOB").val();
    if (dob === "") {
        $("#dateDOB").next().html("Date of Birth need dd/mm/yyyy.");
        errDOB = true;
    }
    else {
        var date = dob.split("-");
        var dateNow = new Date();
        if ( date[0] > dateNow.getFullYear()){
            $("#dateDOB").next().html("Date of Birth cannot be this year or future.");
            errDOB = true;
        }
        else {
            errDOB = false;
        }
    }
}
function emailValidation(){
    $("#txtEmail").next().html("");
    var email = $.trim($("#txtEmail").val());
    if ( email === "" ) {
        $("#txtEmail").next().html("Email field cannot be blank.");
        errEmail = true;
    }
    else {
        var regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z.]+$/;
        if (regex.test(email)) {
            errEmail = false;
        }
        else{
            $("#txtEmail").next().html("Email is not in correct format.");
            errEmail = true;
        }
    }
}
function phoneNumbervalidation(){
    phone = [];
    var regex = /^[1-9][0-9]{9}$/;
    $(".contact-number").each(function(){
        var phoneNumber = $(this).val();
        if (phoneNumber === ""){
            $(this).parent().children("div").html("Contact Number cannot be blank.");

        }
        else {
            if (!regex.test(phoneNumber)){
                $(this).parent().children("div").html("Please enter a valid ten-digit number only.");
            }
        }      
        phone.push(phoneNumber);
    })
    errPhone = false;
    phone.forEach(function(value){
        if (!regex.test(value)){
            errPhone = true;
            return;
        }
    })
}
function addressValidation(){
    street = [], city = [], state = [], country = [], pinCode = []; 
    var regex = /^[1-9][0-9]{5}$/;
    $(".address-street").each(function(){
        if ($.trim($(this).val()) === ""){
            $(this).next().html("Street field cannot be blank.");
        }
        street.push($.trim($(this).val()));
    })
    $(".address-country").each(function(){
        if ($(this).val() === ""){
            $(this).next().html("Choose a country.");
        }
        country.push($(this).val());
    })
    $(".address-state").each(function(){
        if ($(this).val() === ""){
            $(this).next().html("Choose a state.");
        }
        state.push($(this).val());
    })
    $(".address-city").each(function(){
        if ($.trim($(this).val()) === ""){
            $(this).next().html("City Field cannot be blank.");
        }
        city.push($.trim($(this).val()));
    })
    $(".address-pin-code").each(function(){
        if ( $.trim($(this).val()) === "" ){
            $(this).next().html("Pin Code cannot be blank.");
        }
        else {
            if( $.trim($(this).val()).length != 6 || !regex.test($.trim($(this).val()))){
                $(this).next().html("Enter a valid six-digit pin Code.");
            }
        }
        pinCode.push($.trim($(this).val()));
    })
    errAddress = false;
    street.forEach(function(value){
        if (value === ""){
            errAddress = true;
            return;
        }
    })
    country.forEach(function(value){
        if (value === ""){
            errAddress = true;
            return;
        }
    })
    state.forEach(function(value){
        if (value === ""){
            errAddress = true;
            return;
        }
    })
    city.forEach(function(value){
        if (value === ""){
            errAddress = true;
            return;
        }
    })
    pinCode.forEach(function(value){
        if (!regex.test(value)){
            errAddress = true;
            return;
        }
    })
}
function aadhaarValidation(){
    $("#txtAadhaarCard").next().html("");
    var aadhaarCard = $.trim($("#txtAadhaarCard").val());
    if ( aadhaarCard === "" ) {
        $("#txtAadhaarCard").next().html("Aadhaar Field cannot be blank.");
        errAadharNumber = true;
    }
    else {
        var regex = /^[1-9][0-9]+$/;
        if (regex.test(aadhaarCard)) {
            errAadharNumber = false;
        }
        else{
            $("#txtAadhaarCard").next().html("Aadhaar Number is not in correct format.");
            errAadharNumber = true;
        }
    }
}
function panValidation(){
    $("#txtPanNumber").next().html("");
    var panNumber = $.trim($("#txtPanNumber").val());
    if ( panNumber === "" ) {
        $("#txtPanNumber").next().html("PAN Field cannot be blank.");
        errPanNumber = true;
    }
    else {
        var regex = /^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]$/;
        if (regex.test(panNumber)) {
            errPanNumber = false;
        }
        else{
            $("#txtPanNumber").next().html("PAN Number is not valid.");
            errPanNumber = true;
        }
    }
}
function imageValidation(){
    $(".file-upload-content").next().html("");
    var urlImage = $(".file-upload-input").val();
    if (urlImage === ""){
        errProfilePicture = true;
        $(".file-upload-content").next().html("Please Upload a profile picture.");
    }
    else{
        errProfilePicture = false;
    }
}
function captchaValidation(){
    $("#txtInputCaptchaValue").next().html("");
    if(validateCaptcha()){
        errCaptcha = false;
    }
    else {
        $("#txtInputCaptchaValue").next().html("Retry Captcha! Wrong Answer");
        errCaptcha = true;
    }
}


$ ( ".contact-field" ).on("blur", ".contact-number", function(){
    $(this).parent().children("div").html("");
    var phoneNumber = $.trim($(this).val());
    if ( phoneNumber === "" ){
        $(this).parent().children("div").html("Contact Number cannot be blank.");
    }
    else {
        var regex = /^[1-9][0-9]+$/;
        if (phoneNumber.length != 10 || !regex.test(phoneNumber)) {
            $(this).parent().children("div").html("Please enter a valid ten-digit number only.");
        }
    }
})
$ ( ".address-field" ).on("blur", ".address-street", function(){
    $(this).next().html("");
    var addressStreet = $.trim($(this).val());
    if ( addressStreet === "" ){
        $(this).next().html("Street field cannot be blank.");
    }
})
$ ( ".address-field" ).on("blur", ".address-country", function(){
    $(this).next().html("");
    var addressCountry = $(this).val();
    if ( addressCountry === "" ){
        $(this).next().html("Choose a country.");
    }
})
$ ( ".address-field" ).on("blur", ".address-state", function(){
    $(this).next().html("");
    var addressState = $(this).val();
    if ( addressState === "" ){
        $(this).next().html("Choose a state.");
    }
})
$ ( ".address-field" ).on("blur", ".address-city", function(){
    $(this).next().html("");
    var addressCity = $.trim($(this).val());
    if ( addressCity === "" ){
        $(this).next().html("City Field cannot be blank.");
    }
})
$ ( ".address-field" ).on("blur", ".address-pin-code", function(){
    $(this).next().html("");
    var addressPinCode = $.trim($(this).val());
    if ( addressPinCode === "" ){
        $(this).next().html("Pin Code cannot be blank.");
    }
    else {
        if( addressPinCode.length != 6 || !(/^[1-9][0-9]{5}$/).test(addressPinCode)) {
            $(this).next().html("Enter a valid six-digit pin Code.");
        }
    }
})

$("button[type='reset']").click(function(){
    $(".error").text("");
})



