

window.onresize = autoResizeDiv;
window.onload = init;
var arrayElements = "";
var mousePoints = 0;


//making the botton always show at the bottom that's why we are resizing main to max height of page
function autoResizeDiv()
{
     document.getElementById('main').style.height = window.innerHeight +'px';
}

//getting points of the mouse
function getCursorXY(e){
    element = 'pointing';
    posX = getMouseXPosition(e);
    posY = getMouseYPosition(e);
    responseValue = document.getElementById(element);
    document.getElementById(element).value = '(' + posX + ',' + posY + ')'; 
}
//saving points on click
function saveCursorXY(e){
    
    element = 'points';
    posX = getMouseXPosition(e);
    posY = getMouseYPosition(e);
    responseValue = document.getElementById(element).value;
    var posXY =  '(' + posX + ',' + posY + ')';
   
   
   // arrayElements[arrayElements.length]= "testing"
 
    if(isEmpty(responseValue)){
        document.getElementById(element).value = posXY; 
        arrayElements = posXY
    } 
    else
    {
        document.getElementById(element).value += ',' + posXY; 
        arrayElements  += ',' + posXY; 
    } 
    
   
    mousePoints++;
  /*  if(mousePoints >=2){
        x = getMouseXY(arrayElements,mousePoints - 2);
        y = getMouseXY(arrayElements,mousePoints - 1);
        createLine(x[0],x[1],y[0],y[1]);

    }*/
}
//validation on click of submit button
function validate(){
    pointsSize = mousePoints;
    
    switch(pointsSize){
        case 3: triangle();
                break;
        case 4: fourPoints();
                break;
        default: firstLastDistance();
                
    }
}

function triangle(){
    a =  getMouseXY(arrayElements,0);
    b =  getMouseXY(arrayElements,1);
    c =  getMouseXY(arrayElements,2);
    type = '';
    sideA = calculateDistance(a[0],a[1],b[0],b[1]);
    sideB = calculateDistance(b[0],b[1],c[0],c[1]);
    sideC = calculateDistance(c[0],c[1],a[0],a[1]);
    if(isosceles(sideA,sideB,sideC)){
        alert('Isosceles!');
        type = 'isosceles';
    }
    else
    {
        alert('Just another triangle');
        type = 'other';
    }
    area = triangleArea(sideA,sideB,sideC);
    sendToSite('triangle?area=' + area + '&type=' + type + '&points=' + btoa('['+arrayElements+']'));
   // triangle?area=<area>&type=<isosceles|other>&points=
}

function isosceles(a,b,c){
    return a==b || b==c || a==c;
}

function fourPoints(){
    a =  getMouseXY(arrayElements,0);
    b =  getMouseXY(arrayElements,1);
    c =  getMouseXY(arrayElements,2);
    d =  getMouseXY(arrayElements,3);
    if(checkIsSquare(a,b,c,d)){
        area = calculateSquare(a,b,c,d);
        //square?area=<area>;&points=
        sendToSite('square?area=' + area +';&points=' + btoa('['+arrayElements+']') );
    } else {
        firstLastDistance();
    }
}

function checkIsSquare(a,b,c,d){
    if((a[0] == b[0] && b[1] == c[1] && c[0] == d[0] && a[1]== d[1])
        || (a[1]==b[1] && b[0] == c[0] && c[1] == d[1] && a[0] == d[0])){
        return true;

    } else {
        return false;
    }
     
}

function firstLastDistance(){
   x = getMouseXY(arrayElements,0);
   y = getMouseXY(arrayElements,mousePoints-1);
    distance = calculateDistance(x[0],x[1],y[0],y[1]);
    alert('The traveled distance is: ' + distance);
}

function createLineElement(x, y, length, angle) {
    var line = document.createElement("div");
    var styles = 'border: 1px solid black; '
               + 'width: ' + length + 'px; '
               + 'height: 0px; '
               + '-moz-transform: rotate(' + angle + 'rad); '
               + '-webkit-transform: rotate(' + angle + 'rad); '
               + '-o-transform: rotate(' + angle + 'rad); '  
               + '-ms-transform: rotate(' + angle + 'rad); '  
               + 'position: absolute; '
               + 'top: ' + y + 'px; '
               + 'left: ' + x + 'px; ';
    line.setAttribute('style', styles);  
    return line;
}

function createLine(x1, y1, x2, y2) {
    var a = x1 - x2,
        b = y1 - y2,
        c = Math.sqrt(a * a + b * b);

    var sx = (x1 + x2) / 2,
        sy = (y1 + y2) / 2;

    var x = sx - c / 2,
        y = sy;

    var alpha = Math.PI - Math.atan2(-b, a);

    return createLineElement(x, y, c, alpha);
}

function calculateDistance(x1,x2,y1,y2){
    var a = x1 - x2;
    var b = y1 - y2;
    return Math.sqrt( a*a + b*b ); 
}

function getMouseXY(str,index){
    str = str.replace(/\(/g,'').replace(/\)/g,'');
    arrayStr = str.split(',');
    var a = [];
    a[0] = arrayStr[(2*index)];
    a[1] = arrayStr[(2*index)+1]; 
    return a;
}

function validateSquare(){

}

function howManyPoints(){
   
  return (arrayElements.split(",").length - 1);
}
function getMouseXPosition(e) {
    return (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
}

function getMouseYPosition(e){
    return (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
}

function isEmpty(data)
{
  if('undefined'=== typeof data){
      return true;
  }
  if(typeof(data) == 'number' || typeof(data) == 'boolean')
  {
    return false;
  }
  if(typeof(data) == 'undefined' || data === null)
  {
    return true;
  }
  if(typeof(data.length) != 'undefined')
  {
    return data.length == 0;
  }
  var count = 0;
  for(var i in data)
  {
    if(data.hasOwnProperty(i))
    {
      count ++;
    }
  }
  return count == 0;
}

function init() {

    document.addEventListener("click", saveCursorXY);
    document.addEventListener("mousemove",getCursorXY);
	mousePoints = 0;
    autoResizeDiv();
}


// gives you the area of a triangle if you know all 3 sides
function triangleArea(side1,side2,side3) {
	var p = (side1+side2+side3)/2;
	var a = Math.sqrt(p*(p-side1)*(p-side2)*(p-side3));
  return a;
}

function sendToSite(str){
    var client = new HttpClient();
    client.get('https://example.org/'+ str, function(response) {
       cleanPage();
        document.getElementById('response').value = response;
    });
 
}
function cleanPage(){
   
    arrayElements = '';
    document.getElementById('points').value = '';
    mousePoints = 0;
}

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
        anHttpRequest.onerror = function() {
            alert('Bad server call.');
            cleanPage();
        }
    }
}

