let h1 = create_element('h1','hclass');
h1.textContent='Database';
document.body.append(h1);

let divmain = create_element('div');


let div = create_element('div','pagination');

for(let k=1; k<=10; k++){
let button = create_element_link('button',k)
button.type = 'button';
div.append(button);
}

let button11 = create_element_th('button','first')
let button12 = create_element_th('button','next')
let button13 = create_element_th('button','prev')
button13.addEventListener('click',previous1);
button11.addEventListener('click',first);
button12.addEventListener('click',next);

let tbody= create_element('tbody')

div.append(button11,button12,button13);
document.body.append(div);


function create_element(elemname, className='', id1=''){
    let elem = document.createElement(elemname);
    elem.setAttribute('class',className);
    elem.setAttribute('id',id1);
    return elem;
}

function create_element_link(elemname, value=''){
    let elem = document.createElement(elemname);
    
    elem.innerHTML=value;
   elem.addEventListener('click', fetchdata)
    
    return elem;
}

function create_element_th(elemname, value=''){
    element = document.createElement(elemname);
    element.innerHTML=value;
    return element;
}


  let table = create_element('table');
    let thead = create_element('thead');
    let tr = create_element('tr');
    let th1 = create_element_th('th','ID');
    let th2 = create_element_th('th','NAME');
    let th3 = create_element_th('th','EMAIL')

 tr.append(th1,th2,th3);
 thead.append(tr);
 table.append(thead);

 

  let arr = []

function fetchdata(event){
    arr.push(event.target);
     let b = document.getElementsByTagName('button');
    for(let i=0 ; i <b.length ; i++ ){
        if(b[i].className =='active')
        b[i].classList.remove('active');
        tbody.innerHTML = '';
    }
    event.target.classList.add('active');
   
    fetch('https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json')
    .then(response => {
        return response.json();
    }).then(result => {
        let res = result.length;
        let len = Math.floor(res/10);
        let data = event.target.innerHTML;
        if(data !== 'first' || data !== 'last' || data !== 'prev')
       displaydata(data, result, len);
    }).catch(err => {
        console.log(err);
    })
    
}


function fetchdata1(ele){
    fetch('https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json')
    .then(response => {
        return response.json();
    }).then(result => {
        let res = result.length;
        let len = Math.floor(res/10);
        let data = ele.innerHTML;
       displaydata(data, result, len);
    }).catch(err => {
        console.log(err);
    })
}

 function displaydata(data, result, len){
     
       console.log(result);
     for(let i=(data-1)*10; i<data*len ;i++){
        let tr2 = create_element('tr');
        let td1 = create_element_th('td',result[i].id);
        let td2 = create_element_th('td',result[i].name);
        let td3 = create_element_th('td',result[i].email);
        tr2.append(td1,td2,td3)
        tbody.append(tr2);
     }
}
table.append(tbody);
divmain.append(table);
document.body.append(divmain);


function previous1(){
    tbody.innerHTML = '';
    let e = arr[arr.length-1];
    let text = 0;
    text = parseInt(e.innerHTML) -1;
     let ele = document.getElementsByTagName('button');
    for(let i=0; i<ele.length-1;i++){
      if(ele[i].innerHTML == text ){
          arr.push(ele[i]);
        fetchdata1(ele[i]);
        
      }
}
}

function next(){
    tbody.innerHTML = '';
    let e = arr[arr.length-1];
    let text = 0;
    text = parseInt(e.innerHTML) +1;
     let ele = document.getElementsByTagName('button');
    for(let i=0; i<ele.length-1;i++){
      if(ele[i].innerHTML == text ){
          arr.push(ele[i]);
        fetchdata1(ele[i]);
        
      }
}
}

function first(){
    tbody.innerHTML = '';
    let ele = document.getElementsByTagName('button')[0];
    fetchdata1(ele);
}

