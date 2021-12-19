function signIn(){

    //values of email and password inputs
    username = document.getElementById("emailInput").value;
    password = document.getElementById("passwordInput").value;

    //check if values match below
    if(username == 'admin@ncirl.ie' && password == '11111111111'){
        //redirect to order page
        window.location.replace("index.html");
    }
    else if(username != 'admin@ncirl.ie' || password != '11111111111'){
        document.getElementById('passwordError').innerHTML = "Username or password are incorrect. Please try again <br><br>"
    }
    //show error if either password or username are null
    else{
        document.getElementById("passwordError").innerHTML = "Username or password cannot be empty <br>"
    }

    return false
}

function checkPassword(){

    //get value of password
    password = document.getElementById("passwordInput").value;

    //if password length is not equal to 11 display error message
    if(password.length != 11)
        document.getElementById("passwordError").innerHTML = "Password must be exactly 11 characters <br>"
}