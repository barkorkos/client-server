var email;
var password;
var password_confirmation;
var name;
var subject;
var themessage;
var status;


function clearfiledLogin()
{
    document.getElementById("validemail").innerHTML= "";
    document.getElementById("validpassword").innerHTML ="";
    document.getElementById("errorMessage").innerHTML="";
}
function clearfiledSignup()
{
    document.getElementById("validemail").innerHTML= "";
    document.getElementById("validpassword1").innerHTML ="";
    document.getElementById("validpassword2").innerHTML="";
    document.getElementById("errorMessage").innerHTML="";

}
function clearfiledforgetpass()
{
    document.getElementById("errorMessage2").innerHTML="";
}

function clearfiledcoontact()
{
    document.getElementById("validemail").innerHTML= "";
    document.getElementById("validname").innerHTML= "";
    document.getElementById("validtext").innerHTML= "";
    document.getElementById("errorMessage").innerHTML="";

}

function Login()
{   
    email_text_box = document.getElementById("emailLogin");
    password_text_box = document.getElementById("passwordLogin");
    valid_email = document.getElementById("validemail");
    console.log(valid_email)
    valid_password = document.getElementById("validpassword");
    var credentials={
        userName: email_text_box.value,
        password: password_text_box.value
    }
    if(credentials.userName==="" || credentials.password==="")
    {
        
        if(credentials.userName==="")
        {
            email_text_box.style.borderColor = "red";
            email_text_box.style.borderWidth = "2px";
            document.getElementById("validemail").innerHTML= "<small> Invalid Email </small>";
        }
       
        if(credentials.password==="")
        {
            password_text_box.style.borderColor ="red";
            password_text_box.style.borderWidth = "2px";
            document.getElementById("validpassword").innerHTML ="<small> password must contain at least 6 characters, uppercase, lowercase, number, special character.</small>";
        }
        return;
    }
    if (!validateEmail(email_text_box.value)){
        email_text_box.style.borderColor = "red";
        email_text_box.style.borderWidth = "2px"
        document.getElementById("validemail").innerHTML= "<small> Invalid Email </small>";
        return;
    }
    if(!validatePassword(password_text_box.value)){
        console.log(222)
        password_text_box.style.borderColor ="red";
        password_text_box.style.borderWidth = "2px";
        document.getElementById("validpassword").innerHTML ="<small> password must contain at least 6 characters, uppercase, lowercase, number, special character.</small>";
        return;

    }

    $.ajax({
        type: 'POST',
        url: '/login',
        data: credentials,
        // Login Successful
        success: function(userData){
            console.log(userData);
            sessionStorage.setItem('user', JSON.stringify(userData))
            location.replace('/mainView');
        },
        error: function(res){
            document.getElementById("errorMessage").innerHTML="Oops... wrong details";
        }
    });
}

function SignUp()
{
    email_text_box = document.getElementById("emailSignUp");
    password_text_box = document.getElementById("passwordSignUp");
    password_confirmation_txt_box = document.getElementById("confirmation");
    valid_email = document.getElementById("confirmation");
    var signUp_details={
        email: document.getElementById("emailSignUp").value,
        password: document.getElementById("passwordSignUp").value
    }
    email=document.getElementById("emailSignUp").value;
    password=document.getElementById("passwordSignUp").value;
    password_confirmation=document.getElementById("confirmation").value;
    if(email==""||password==""||password_confirmation=="")
    {
        if(email=="")
        {
            email_text_box.style.borderColor = "red";
            email_text_box.style.borderWidth = "2px";
            document.getElementById("validemail").innerHTML= "<small> Invalid Email </small>";
        }
        if(password=="")
        {
            password_text_box.style.borderColor ="red";
            password_text_box.style.borderWidth = "2px";
            document.getElementById("validpassword1").innerHTML="<small>Password must contain at least 6 characters,<br>uppercase, lowercase, number, special character.</small>";
        }
        if(password_confirmation=="")
        {
            password_confirmation_txt_box.style.borderColor ="red";
            password_confirmation_txt_box.style.borderWidth = "2px";
            document.getElementById("validpassword2").innerHTML ="<small>must enter confirmation password</small>";
        }
        return;
    }

    if(validateEmail(email))
    {
       
        console.log(password)

        if(validatePassword(password))
        {  
            if(password != password_confirmation)
            {
            password_confirmation_txt_box.style.borderColor ="red";
            password_confirmation_txt_box.style.borderWidth = "2px";
            document.getElementById("validpassword2").innerHTML ="<small>Password are not maching</small>";
            return;
            } 
        }
        else{
            password_text_box.style.borderColor ="red";
            password_text_box.style.borderWidth = "2px";
            document.getElementById("validpassword1").innerHTML="<small>Password must contain at least 6 characters,<br>uppercase, lowercase, number, special character.</small>";
            return;
        }
    }
    else
    {
        email_text_box.style.borderColor = "red";
        email_text_box.style.borderWidth = "2px";
        document.getElementById("validemail").innerHTML= "<small> Invalid Email </small>";
        return;
    }


    $.ajax({
        type: 'POST',
        url: '/signUp',
        data: signUp_details,
        // Login Successful
        success: function(userData){
            document.getElementById("errorMessage").innerHTML="Congratulations! Now you can Sign in! ";
        },
        error: function(res){
            document.getElementById("errorMessage").innerHTML="Oops... User already exists";
        }
    });

}

function validateContuct(){
    email = document.getElementById("emailContuct");
    name = document.getElementById("nameContuct");
    subject = document.getElementById("subject");
    themessage = document.getElementById("theMessage");
    if (email.value == "" || name.value  == ""  || themessage.value  == "")
    {   
        if(email ==""){
            email.style.borderColor = "red";
            email.style.borderWidth = "2px";
            document.getElementById("validemail").innerHTML= "<small> Invalid Email </small>";
        }
        if(name == ""){
            name.style.borderColor = "red";
            name.style.borderWidth = "2px";
            document.getElementById("validname").innerHTML= "<small> Please enter your name </small>";
        }
        if(themessage == ""){
            themessage.style.borderColor = "red";
            themessage.style.borderWidth = "2px";
            document.getElementById("validtext").innerHTML= "<small> Please enter a message </small>";
        }

    }

    validateEmail(email);
}


// function validateEmail(email)
// {

//     var reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

//     if(!reg.test(email))
//     {
//         return false;
//     }
//     return true;
// }


// function validateEmail(mail) 
// {
//  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
//   {
//     return (true)
//   }
//     return (false)
// }

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


function validatePassword(password)
{
    var reg;
    if(password.length < 6)
    {
        console.log(1);
        return false;
    }

    reg=/[A-Z]/;
    if(!reg.test(password))
    {
        console.log(2);
        return false;
    }

    reg=/[a-z]/;
    if(!reg.test(password))
    {
        console.log(3);
        return false;
    }

    reg=/\d/;
    if(!reg.test(password))
    {
        console.log(4);
        return false;
    }

    reg=/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if(!reg.test(password))
    {
        console.log(5);
        return false;
    }

    return true;
}


function forget(){
    var forget_details={
        email: document.getElementById("emailforget").value,
    }
  
    if(forget_details.email=="")
    {
        document.getElementById("allertemail").style.visibility="visible";
       // alert("Please anter email, password and confirmation password");
        return;
    }


    $.ajax({
        type: 'POST',
        url: '/forgetPassword',
        data: forget_details,
        // Login Successful
        success: function(userData){
            document.getElementById("errorMessage2").innerHTML="Email with your password sent!";

        },
        error: function(res){
            document.getElementById("errorMessage2").innerHTML="Oops... Somting wrong happend. Enter your email again!";
        }
    });


}

function update_table(){
    var userDetails = JSON.parse(sessionStorage.getItem('user'));
    console.log(userDetails);

    console.log("update");
    $.ajax({
        type: 'POST',
        url: '/getUserData',
        data: userDetails,
        success: function(table_data){
            console.log("yayyy!!!");
            insert_to_table(table_data);
        },
        error: function(res){
            console.log("shiiitt!!")
        }
    });
}

function insert_to_table(table_data){
    var user = sessionStorage.getItem("user");
    if(user){
        for (i=0; i< table_data.length; i++){
            $('#example tbody').append("<tr onclick=initMap("+table_data[i].lat+","+table_data[i].long+","+table_data[i].data1+","+table_data[i].data2+")><td align='center'>"+table_data[i].data1+"</td><td align='center'>"+table_data[i].data2+"</td></tr>")
        }
        $('#example').DataTable({
            pageLength: 6,
            lengthMenu: [6, 12, 20]
        });
        if(table_data.length > 0)
            initMap(parseFloat(table_data[0].lat), parseFloat(table_data[0].long),  parseFloat(table_data[0].data1),  parseFloat(table_data[0].data2));
    }


}

function initMap(mylat, mylong, data1, data2){
    console.log(mylat, mylong);
    var loction = {lat:mylat, lng: mylong};
    var map = new google.maps.Map(
    document.getElementById('map'), {zoom: 4, center: loction});
    var marker = new google.maps.Marker({position: loction, map: map});

    if (data1 && data2) {
        var infowindow = new google.maps.InfoWindow({
            content: '   Data1: ' + data1 + ', Data2: ' + data2
        });
        infowindow.open(map, marker);
        }
}

function logOut()
{
    sessionStorage.removeItem("user");
    location.replace('/login');

}

function sendContuctUsMail()
{

    email = document.getElementById("emailContuct");
    name = document.getElementById("nameContuct");
    subject = document.getElementById("subject");
    themessage = document.getElementById("theMessage");
    if (email.value === "" || name.value  === ""  || themessage.value  === "")
    {   
        if(email.value ==""){
            email.style.borderColor = "red";
            email.style.borderWidth = "2px";
            document.getElementById("validemail").innerHTML= "<small> Invalid Email </small>";
        }
        console.log("%"+name.value+"%")
        if(name.value == ""){
            name.style.borderColor = "red";
            name.style.borderWidth = "2px";
            document.getElementById("validname").innerHTML= "<small> Please enter your name </small>";
        }
        if(themessage.value == ""){
            themessage.style.borderColor = "red";
            themessage.style.borderWidth = "2px";
            document.getElementById("validtext").innerHTML= "<small> Please enter a message </small>";
        }
        return;

    }
    if(!validateEmail(email.value)){
        email.style.borderColor = "red";
        email.style.borderWidth = "2px";
        document.getElementById("validemail").innerHTML= "<small> Invalid Email </small>";
        return;
    }

    subjectfromList= document.getElementById("subject")
    var contuctDetails={
        name: document.getElementById("nameContuct").value,
        email: document.getElementById("emailContuct").value,
        subject: subjectfromList.options[subjectfromList.selectedIndex].text,
        message: document.getElementById("theMessage").value
    }

    $.ajax({
        type: 'POST',
        url: '/sendContuctMail',
        data: contuctDetails,
        // Login Successful
        success: function(userData){
            document.getElementById("errorMessage").innerHTML="The mail was sent!";
        },
        error: function(res){
            document.getElementById("errorMessage").innerHTML="Oops... wrong details email was not sent";
        }
    });

}

