var usStates = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California',
'Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia',
'Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana',
'Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri',
'Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina',
'North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania',
'Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah',
'Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

var indiaStates = [ "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana",
"Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
"Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttarakhand",
"Uttar Pradesh","West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli","Daman and Diu",
"Delhi","Lakshadweep","Puducherry"];

//Addition of dynamic fields.

$(".contact-field").on("click", ".fa-plus-square", function(){
    $(".contact-field").append(`
    <div class="row">
        <div class="col-3">
            <input class="contact-number" type="text" name="phone[]" maxlength="10" placeholder="e.g. XXXXXXXXXXX" />
            <i class="fa fa-minus-square" title="Click to remove Phone Number."></i>
            <div class="error"></div>
        </div>
    </div>`);
})

$(".contact-field").on("click", ".fa-minus-square", function(){
    $(this).parent("div").remove();
})

$(".address-container").on("click", ".add-more-field", function(){
    $(".address-container").append(`
    <div class="address-field">
    <legend class='delete-field'>Remove<i class="fa fa-minus-square"></i></legend> 
    <fieldset>
        <div class="row">
            <div class="col-3">
                <label>Street/Locality</label><i class="red-asterisk">*</i>
                <textarea class="address-street" placeholder="e.g. 10th downing street." maxlength="25"></textarea>
                <div class="error"></div>
            </div>
            <div class="col-3">
                <label>Country</label><i class="red-asterisk">*</i>
                <select class="address-country">
                    <option value="">----Select Country----</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                </select>
                <div class="error"></div>
            </div>
            <div class="col-3">
                <label>State</label><i class="red-asterisk">*</i>
                <select class="address-state">
                    <option value="">Please Select Country First</option>
                </select>
                <div class="error"></div>
            </div>
        </div> 
        <div class="row">
            <div class="col-3">
                <label>City</label><i class="red-asterisk">*</i>
                <input class="address-city" type="text" placeholder="e.g. Bhubaneswar" minlength="3" maxlength="25">
                <div class="error"></div>
            </div>
            <div class="col-3">
                <label>Pin/Zip Code</label><i class="red-asterisk">*</i>
                <input class="address-pin-code" type="text" maxlength="6" placeholder="e.g. 751024"/>
                <div class="error"></div>
            </div>
        </div>         
    </fieldset>
    </div>`);
});

$(".address-container").on("click", ".delete-field", function(){
    $(this).parent().remove();
})

$(".address-container").on("change", ".address-country", function(){
    txt="";
    var country = $(this).val();
    switch ( country ){
        case "India":
            txt += stateList(indiaStates);
            break;
        case "USA":
            txt += stateList(usStates);
            break;
        default:
            txt="<option val=''>Please Select Country First</option>";
    }
    $(this).parent().next().children(".address-state").html(txt);
})

function stateList(arr) {
    var txt="<option value=''>----Select State----</option>";
    arr.forEach(function(value){
        txt += "<option value='" + value + "'>" + value + "</option>";
    });
    return txt;
}

//captcha scripts............................................

function generateCaptcha(){
    var operatorArray = ["+", "-", "/", "*"];
    var maxNum = 99;
    var operand1 = Math.ceil(Math.random() * maxNum) + 1;
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
    var inputAns = $("#txtInputCaptchaValue").val();
    if (captchaAns === inputAns) {
        return true;
    }
}



