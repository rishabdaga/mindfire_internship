$(function(){
    var validator = [];
    $( document ).ready(function(){
        generateCaptcha();
        $(".resume").hide();

        $(".refreshCaptcha").click(function(){
            generateCaptcha();
        });

        $( "form" ).submit(function(event){
            validationAllFields(event);
        });

        $("button[type='reset']").click(function(){
            $(".error").text("");
        });

        $(".close").click(function() {
            $(".modal").hide();
        });

        //blur events .....

        $( "#txtFirstName" ).blur(function(){
            validateField($(this), true, /^[a-zA-Z]+$/, "First Name Cannot Contain spaces  or special characters.", $(this).next());
        });
        $( "#txtMiddleName" ).blur(function(){
            validateField($(this), false, /^[a-zA-Z]+$/, "Middle Name Cannot Contain spaces  or special characters.", $(this).next());
        });
        $( "#txtLastName" ).blur(function(){
            validateField($(this), true, /^[a-zA-Z]+$/, "Last Name Cannot Contain spaces  or special characters.", $(this).next());
        });
        $( "#dateDOB" ).blur(function(){
            dateOfBirthValidation($(this));
        });
        $( "#txtEmail" ).blur(function(){
            validateField($(this), true, /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z.]+$/, "Not a valid Email", $(this).next());
        });
        $( ".contact-field" ).on("blur", ".contact-number", function(){
            var errorElement = $(this).parent().children('div');
            validateField($(this), true, /^[1-9][0-9]{9}$/, "Please enter a valid ten-digit number starting from 1-9.", errorElement);
        });
        $ ( ".address-field" ).on("blur", ".address-street", function(){
            var errorElement = $(this).next();
            validateField($(this), true, /^[a-zA-Z0-9,. ]*$/, "Please enter a valid street/locality.", errorElement);
        });
        $ ( ".address-field" ).on("blur", ".address-country", function(){
            var errorElement = $(this).next();
            validateField($(this), true, /^/, "", errorElement);
        });
        $ ( ".address-field" ).on("blur", ".address-state", function(){
            var errorElement = $(this).next();
            validateField($(this), true, /^/, "", errorElement);
        });
        $ ( ".address-field" ).on("blur", ".address-city", function(){
            var errorElement = $(this).next();
            validateField($(this), true, /^[a-zA-Z ]+/, "Please enter a valid city name.", errorElement);
        });
        $ ( ".address-field" ).on("blur", ".address-pin-code", function(){
            var errorElement = $(this).next();
            validateField($(this), true, /^[1-9][0-9]{5}$/, "Enter a valid six-digit pin Code.", errorElement);
        });        
        $( "#txtAadhaarCard" ).blur(function(){
            validateField($(this), true, /^[1-9][0-9]+$/, "Aadhaar Number is not in correct format.", $(this).next());
        });
        $( "#txtPanNumber" ).blur(function(){
            validateField($(this), true, /^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]$/, "PAN Number is not valid.", $(this).next());
        });
    });

    //common validation function for all field except date of birth

    function validateField(selector, required, pattern, errMessage, errMessageElement) {
        validator.push("error");
        errMessageElement.text("");
        var value = $.trim(selector.val());
        if (value === "") {
            if (required) {
                errMessageElement.text("Required field! Cannot be blank.");
            }
            else {
                validator.pop();
            }
        }
        else {
            if(!pattern.test(value)) {
                errMessageElement.text(errMessage);
            }
            else {
                validator.pop();
            }
        } 
    }

    //final validation on submit buttons
    
    function validationAllFields( event ) {
        event.preventDefault();
        validator = [];

        var firstName = $("#txtFirstName");
        var middleName = $("#txtMiddleName");
        var lastName = $("#txtLastName");
        var email = $("#txtEmail");
        var gender = $("input[name='gender']:checked");
        var phoneNumber = $(".contact-number");
        var dob = $("#dateDOB");
        var aadhaarNumber = $("#txtAadhaarCard");
        var panNumber = $("#txtPanNumber");
        var imageURL = $(".file-upload-input");  

        var phoneAll = "";
        var addressAll ="<ul>";
        
        validateField(firstName, true, /^[a-zA-Z]+$/, "First Name Cannot Contain spaces  or special characters.", firstName.next());
        validateField(middleName, false, /^[a-zA-Z]+$/, "Middle Name Cannot Contain spaces  or special characters.", middleName.next());
        validateField(lastName, true, /^[a-zA-Z]+$/, "Last Name Cannot Contain spaces  or special characters.", lastName.next());
        validateField(email, true, /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z.]+$/, "Not a valid Email", email.next());
        validateField(gender, true, /^/, "", $(".radio-buttons").next());
        phoneNumber.each(function(){
            var errorElement = $(this).parent().children('div');
            phoneAll += $(this).val() + " ";
            validateField($(this), true, /^[1-9][0-9]{9}$/, "Please enter a valid ten-digit number starting from 1-9.", errorElement);
        });
        $(".address-field").each(function(){
            var addressStreet = $(this).find($(".address-street"));
            var addressCity = $(this).find($(".address-city"));
            var addressState = $(this).find($(".address-state"));
            var addressCountry = $(this).find($(".address-country"));
            var addressPinCode = $(this).find($(".address-pin-code"));
            var addressSet = "";

            validateField(addressStreet, true, /^[a-zA-Z0-9,. ]*$/, "Please enter a valid street/locality.", addressStreet.next());
            validateField(addressCountry, true, /^/, "", addressCountry.next());
            validateField(addressState, true, /^/, "", addressState.next());
            validateField(addressPinCode, true, /^[1-9][0-9]{5}$/, "Enter a valid six-digit pin Code.", addressPinCode.next());
            validateField(addressCity, true, /^[a-zA-Z ]+/, "Please enter a valid city name.", addressCity.next());
            addressSet = addressStreet.val() + "<br>" + addressCity.val() + ", " + addressState.val() +
                             "-" + addressPinCode.val() + ", " + addressCountry.val() + ".";
            addressAll += "<li>" + addressSet + "</li>";
        });
        validateField(aadhaarNumber, true, /^[1-9][0-9]+$/, "Aadhaar Number is not in correct format.", aadhaarNumber.next());
        validateField(panNumber, true, /^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]$/, "PAN Number is not valid.", panNumber.next());
        validateField(imageURL, true, /\.(jpg|jpeg|png)$/, "Only .jpg, .jpeg, .png files",$(".file-upload-content").next());
        dateOfBirthValidation(dob);
        captchaValidation(); 
        
        if (validator.length === 0) {
            fullName = $.trim(firstName.val()) + " " + $.trim(middleName.val()) + " " +$.trim(lastName.val());
            $("#name").text(fullName);
            $("#gender").text(gender.val());
            $("#dob").text(dob.val());
            $("#email").text($.trim(email.val()));
            $("#phone").text(phoneAll);
            $("#aadhaarNumber").text(aadhaarNumber.val());
            $("#panNumber").text(panNumber.val());
            $("#address").html(addressAll);
            $(".container").hide();
            $(".navigation-bar").hide();
            $(".resume").show();
        }
        else{
            $(".modal").show();
            window.scrollTo(0, 0);
            generateCaptcha();
        }
    }

    //date of birth validation

    function dateOfBirthValidation(dob){
        validator.push("error");
        dob.next().html("");
        var date = dob.val();
        if (date === "") {
            dob.next().html("Date of Birth need dd/mm/yyyy.");
        }
        else {
            var d = new Date();
            var age = ((Date.parse(d)-Date.parse(date))) / (365*1000*60*60*24);
            console.log(age);
            if(age > 10.000 || age== 10.000)
            {
                validator.pop();
            }
            else{
                if (age < 0) {
                    dob.next().html("Date of birth cannot be future.");
                }
                else {
                    dob.next().html("Your age should be 10 or greater than 10 yrs!!!");
                }
            }
        }
    }

    //captcha validation
    
    function captchaValidation(){
        validator.push("error");
        $("#txtInputCaptchaValue").next().html("");
        if(validateCaptcha()){
            validator.pop();
        }
        else {
            $("#txtInputCaptchaValue").next().html("Retry Captcha! Wrong Answer");
        }
    }
});










