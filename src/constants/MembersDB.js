var kakashiDP = new Image;
var jokerDP = new Image;
var gitDP = new Image;
var stormTrooperDP = new Image;
var maleDP = new Image;
var femaleDP = new Image;

kakashiDP.src = "./src/images/kakashiDP.jpg";   //because of bundling we are giving absolute path
jokerDP.src = "./src/images/jokerDP.jpg";
gitDP.src = "./src/images/gitDP.png";
stormTrooperDP.src = "./src/images/stormTrooperDP.jpg" ;
maleDP.src = "./src/images/icon-1.jpg" ;
femaleDP.src = "./src/images/icon-2.jpg" ;

var allMembers = [{name:"Anand Mani", dp:maleDP},{name:"Aarti", dp:femaleDP} ,{name:"Deepak", dp:kakashiDP} , {name:"Anand Krishnan", dp:stormTrooperDP},{name: "Karthik", dp:gitDP},{name: "Monish", dp:gitDP},{name: "Amma", dp:jokerDP},{name: "Nisha", dp:jokerDP}]

export default allMembers;
