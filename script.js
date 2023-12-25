const form = document.getElementById('form')

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(!validateInputs()){
        return;
    }
});

function validateInputs(){
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const country = document.getElementById("country").value;
    const date = document.getElementById("date").value;
    var gender = document.querySelector('input[name="gender"]:checked');

    const male = document.getElementById("male");
    const female = document.getElementById("female");
    const other = document.getElementById("other");

    const hobbies = Array.from(document.querySelectorAll('input[name="hobbies"]:checked')).map(hobbies => hobbies.value).join(', ');
    const address = document.getElementById("address").value;
    
    let formData = JSON.parse(localStorage.getItem('formData')) || [];
    let exist = formData.length && 
    formData.some(data => 
        data.name.toLowerCase() == name.toLowerCase() && 
        data.email.toLowerCase() == email.toLowerCase()
    );
    var regemail = /^\S+@\S+\.\S+$/;
    var regex = /^[1-9]\d{9}$/; //regular expression for mobile number

    
    if(name.trim() == ""){
        swal("Opps.. !", "Username cannot be empty!", "error");
    }
    else if(email.trim() == ""){
        swal("Opps.. !", "Email cannot be empty!", "error");
    }
    else if(regemail.test(email) === false){
        swal("Opps.. !", "Invalid email!", "error");
    }
    else if(mobile == ""){
        swal("Opps.. !", "Mobile no. cannot be empty!", "error");
    }
    else if(regex.test(mobile) === false){
        swal("Opps.. !", "Enter a valid 10 digit mobile no.!", "error");
    }
    else if(country == "Select"){
        swal("Opps.. !", "Country cannot be empty!", "error");
    }
    else if(date == ""){
        swal("Opps.. !", "Date cannot be empty!", "error");
    }
    else if(!male.checked && !female.checked && !other.checked){
        swal("Opps.. !", "Gender cannot be empty!", "error");
    }
    else if(hobbies == ""){
        swal("Opps.. !", "Hobbies cannot be empty!", "error");
    }
    else if(address.trim() === "" ){
        swal("Opps.. !", "Address cannot be empty!", "error");
    }
    else{
    formData.push({ name, email, mobile, country, date, gender: gender.value, hobbies, address});
    localStorage.setItem('formData', JSON.stringify(formData));

    swal("Success !", "Account created successfully!", "success");
    showData();
    reset();
    document.getElementById('name').focus();
    return true;
    }
   
}

//  Function to display the data

function showData(){
    var formData;
    if(localStorage.getItem("formData") == null){
        formData = [];
    }
    else{
        formData = JSON.parse(localStorage.getItem("formData"))
    }

    var html = "";
    formData.forEach(function (element, index){
        
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.mobile + "</td>";
        html += "<td>" + element.country + "</td>";
        html += "<td>" + element.date + "</td>";
        html += "<td>" + element.gender + "</td>";
        html += "<td>" + element.hobbies + "</td>";
        html += "<td>" + element.address + "</td>";
        html += 
        '<td><button id = "Update" onclick="edit();updateData(' + index + ')" class = "btn">Edit</button> <button id="delete" onclick= "deleteData(' + index + ')" class ="btn">Delete</button> </td>';
        html +="</tr>";
    });
    document.querySelector("table tbody").innerHTML = html;
}
window.onload = showData();

//Function to add data 

function AddData(){
    
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const mobile = document.getElementById("mobile").value;
        const country = document.getElementById("country").value;
        const date = document.getElementById("date").value;
        var gender = document.querySelector('input[name="gender"]:checked');
        const hobbies = Array.from(document.querySelectorAll('input[name="hobbies"]:checked')).map(hobbies => hobbies.value).join(', ');
        const address = document.getElementById("address").value;

        var formData;
        if(localStorage.getItem("formData") == null){
            formData = [];
        }
        else{
            formData = JSON.parse(localStorage.getItem("formData"));
        }
        formData.push({
            name, email, mobile, country, date, gender: gender.value, hobbies, address
    });
    localStorage.setItem("formData",JSON.stringify(formData));
    showData();
    reset();
    }


// Function to delete data

function deleteData(index){
    var formData;
    if(localStorage.getItem("formData") == null) {
        formData = [];
    }else{
        formData = JSON.parse(localStorage.getItem("formData"));
    }

    // alert message
swal({
    title: "Are you sure?",
    text: "You will not be able to recover this data!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#FF2400",
    confirmButtonText: "Yes, delete it!",
    closeOnConfirm: false
  },
  function(){
    swal("Deleted!", "Your data has been deleted.", "success");
    formData.splice(index, 1);
    localStorage.setItem("formData", JSON.stringify(formData));
    showData();
  });   
}

// Function to edit data

function edit(){
    document.getElementById('submitbtn').innerHTML = 'Update';
    swal("", "Do you want to edit this data?")   
}

// update function

function updateData(index) {
    
    var formData = JSON.parse(localStorage.getItem('formData')) || [];

    document.getElementById('name').value = formData[index].name;
    document.getElementById('email').value = formData[index].email;
    document.getElementById('mobile').value = formData[index].mobile;
    document.getElementById('country').value = formData[index].country;
    document.getElementById('date').value = formData[index].date;

    var gender = formData[index].gender;
    document.getElementById(gender).checked = true;

    var hobbies = formData[index].hobbies.split(', ');
    var checkboxes = document.querySelectorAll('input[name="hobbies"]');
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = hobbies.includes(checkbox.value);
    });

    document.getElementById('address').value = formData[index].address;
  
    document.querySelector('#submitbtn').onclick = function (e) {
        e.preventDefault(); 
        
        formData[index].name = document.getElementById('name').value;
        formData[index].email = document.getElementById('email').value;
        formData[index].mobile = document.getElementById('mobile').value;
        formData[index].country = document.getElementById('country').value;
        formData[index].date = document.getElementById('date').value;
        formData[index].gender = document.querySelector('input[name="gender"]:checked').value;
        formData[index].hobbies = Array.from(document.querySelectorAll('input[name="hobbies"]:checked')).map(hobby => hobby.value).join(', ');
        formData[index].address = document.getElementById('address').value;

        localStorage.setItem('formData', JSON.stringify(formData));

        swal("Success !", "Updated successfully!", "success");
        showData();
        document.getElementById('submitbtn').innerHTML = 'Create';  
        reset(); 
    };
};

function reset(){
    document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('mobile').value = '';
        document.getElementById('country').value = '';
        document.getElementById('date').value = '';
        document.querySelector('input[name="gender"]:checked').checked = false;
        document.querySelectorAll('input[name="hobbies"]:checked').forEach((checkbox) => {
            checkbox.checked = false;
        });

        document.getElementById('address').value = '';
}
  