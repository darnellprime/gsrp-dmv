let characters = JSON.parse(localStorage.getItem("characters")) || []

let activeCharacter = null


function openModule(name){

let modules=document.querySelectorAll(".module")

modules.forEach(m=>m.classList.remove("active"))

document.getElementById(name).classList.add("active")

}


function createCharacter(){

let name=document.getElementById("charName").value
let dob=document.getElementById("charDOB").value

if(!name || !dob){
alert("Fill out character info")
return
}

let char={

name:name,
dob:dob,

licenses:{
drivers:true,
firearm:false
},

vehicles:[],
citations:[]

}

characters.push(char)

save()

loadCharacters()

}


function loadCharacters(){

let list=document.getElementById("characterList")

list.innerHTML=""

characters.forEach((c,i)=>{

list.innerHTML+=`

<div class="card">

<b>${c.name}</b><br>

DOB: ${c.dob}

<br><br>

<button onclick="selectCharacter(${i})">Open</button>

</div>

`

})

}


function selectCharacter(index){

activeCharacter=characters[index]

document.getElementById("profileName").innerText=activeCharacter.name
document.getElementById("profileDOB").innerText=activeCharacter.dob

updateProfile()

openModule("profile")

}


function updateProfile(){

document.getElementById("vehicleCount").innerText=
activeCharacter.vehicles.length

document.getElementById("citationCount").innerText=
activeCharacter.citations.length

document.getElementById("firearmStatus").innerText=
activeCharacter.licenses.firearm ? "ACTIVE":"NONE"

}


function addVehicle(){

if(!activeCharacter){
alert("Open a character first")
return
}

let model=document.getElementById("vehModel").value
let plate=document.getElementById("vehPlate").value

activeCharacter.vehicles.push({
model:model,
plate:plate
})

save()

updateProfile()

}


function searchPlayer(){

let name=document.getElementById("searchName").value

document.getElementById("results").innerHTML=`

<tr>

<td>${name}</td>

<td>Class C</td>

<td>Valid</td>

</tr>

`

}


function save(){

localStorage.setItem("characters",JSON.stringify(characters))

}


window.onload=loadCharacters