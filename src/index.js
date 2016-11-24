import React from 'react';
// import { render } from 'react-dom';
import ReactDOM from 'react-dom'
// import Draggable from 'react-draggable';

// import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
require('../node_modules/bootstrap/dist/css/bootstrap.css');
require('../stylesheet.css'); //This is very  bad practice. Always link css from html and dont require them in js files
//Why I'm requiring my css file:
//gh-pages is messed up. I cannot access my node_modules folder [http://stackoverflow.com/questions/39765059/gh-pages-with-static-html-cant-access-file-when-it-exists] thereby, i cannot link it from my html file. Thus, i have to require it (requiring it makes it present in the bundle)
//I can however, access my stylesheet.css  by url. (idk how gh-pages serves node-modules folder)  I can link to it from my html.  But, by mistake, my stylesheet and bootstrap.css have a common class 'modal'
//Since, bootstrap.css is required in the js file, it takes priority and my styles get overwritten, thereby leading to my modal not working.
//Thus, to give my stylesheet precedence, i'm requiring that too in my js.
//Other solution would be to link to my css in html, but add aprropriate !important attribute everywhere

//Also check hosting on Heroku or other sites to prevent such problems

import Board from "./components/Board";

ReactDOM.render(<Board/>,document.getElementById("container"));
