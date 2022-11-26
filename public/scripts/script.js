async function fetchAndPushPages(user){
    let arr = [];
    let thePageWeAreOn = 1;
    let numOfPages = 0;
    do {
        const res = await fetch(`https://test-setlist-api.herokuapp.com/api/${user}/${thePageWeAreOn}`) //Makes a request to the API for the chosen user, and the page. Inside a loop.
        const pageOfData = await res.json();
        arr.push(pageOfData);
        const concertCount = arr[0].total; //the number of concerts attended by a given user
        const itemsPerPage = arr[0].itemsPerPage; //the number of concerts setlist.fm stores per page
        numOfPages = Math.ceil(concertCount / itemsPerPage);//divide total concerts by concerts per page to get the number of pages, rounded up to capture partial pages
        thePageWeAreOn++;
    } while (thePageWeAreOn < numOfPages);
    return arr;
}


async function getFetch(){
    const requestThis = prompt("Which user's calendar should we make?");
    const arrayOfData = await fetchAndPushPages(requestThis);
    let arrayOfConcerts = []; //Possible optimization: see how the guide did this
    let objectOfConcertCounts = {};
    arrayOfData.forEach(e => {
        e.setlist.forEach(n => {
           //For each setlist...
        let grabThis = n.eventDate.split('-').slice(0, 2).join('-'); //Removes the year from the event date
        if (!arrayOfConcerts.includes(grabThis)) { arrayOfConcerts.push(grabThis)} ; //Adds it to an array of present dates, if needed
        if (objectOfConcertCounts[grabThis]) {
            objectOfConcertCounts[grabThis]++; //Incrementing the number of times a date's been attended, if present
        } else {
            objectOfConcertCounts[grabThis] = 1; //If not persent, set it to 1
        }
        })
    })
    localStorage.setItem("arrayOfConcerts", JSON.stringify(arrayOfConcerts));
    localStorage.setItem("objectOfConcertCounts", JSON.stringify(objectOfConcertCounts));
    return [arrayOfConcerts, objectOfConcertCounts]
}

layoutThings = (concertArr, countObj) => {
    //Find the maximum and minimum number of concerts seen
    const valuesArray = Object.values(countObj)
    const [maxShows, minShows] = [Math.max(...valuesArray), Math.min(...valuesArray)];
    const [minLum, maxLum] = [15, 85]
    const [showRange, lumRange] = [maxShows - minShows, maxLum - minLum];
            
    putWithinRange = (numOfShows) => 100 - (minLum + (numOfShows - 1) * lumRange/showRange);

    concertArr.forEach(e => { //Iterates through the array of present dates
        let [day, month] = [e.split('-')[0], e.split('-')[1]]; //Grabs the month and the day
        document.querySelector(`.d${day} .m${month}`).style.backgroundColor = `hsl(305, 100%, ${putWithinRange(countObj[e])}%)`;
    })          

}

async function doThings() {
    let arrayOfConcerts;
    let objectOfConcertCounts;
    
    if (!localStorage.getItem("arrayOfConcerts")) {
        [arrayOfConcerts, objectOfConcertCounts] = await getFetch()
        console.log("heyy")
    } else {
        console.log(localStorage.getItem("arrayOfConcerts"));
        [arrayOfConcerts, objectOfConcertCounts] = await [JSON.parse(localStorage.getItem("arrayOfConcerts")), JSON.parse(localStorage.getItem("objectOfConcertCounts"))];
    }
    console.log("what's the haps")
    layoutThings(arrayOfConcerts, objectOfConcertCounts);  
}

doThings();

//const info = JSON.parse(document.currentScript.dataset.info);
console.log(document.currentScript.dataset);

firsts = document.querySelectorAll('tr.d01 td');
seconds = document.querySelectorAll('tr.d02 td');
thirds = document.querySelectorAll('tr.d03 td');
fourths = document.querySelectorAll('tr.d04 td');
fifths = document.querySelectorAll('tr.d05 td');
sixths = document.querySelectorAll('tr.d06 td');
sevenths = document.querySelectorAll('tr.d07 td');
eighths = document.querySelectorAll('tr.d08 td');
ninths = document.querySelectorAll('tr.d09 td');
tenths = document.querySelectorAll('tr.d10 td');
elevenths = document.querySelectorAll('tr.d11 td');
twelfths = document.querySelectorAll('tr.d12 td');
thirteenths = document.querySelectorAll('tr.d13 td');
fourteenths = document.querySelectorAll('tr.d14 td');
fifteenths = document.querySelectorAll('tr.d15 td');
sixteenths = document.querySelectorAll('tr.d16 td');
seventeenths = document.querySelectorAll('tr.d17 td');
eighteenths = document.querySelectorAll('tr.d18 td');
nineteenths = document.querySelectorAll('tr.d19 td');
twentieths = document.querySelectorAll('tr.d20 td');
twentyfirsts = document.querySelectorAll('tr.d21 td');
twentyseconds = document.querySelectorAll('tr.d22 td');
twentythirds = document.querySelectorAll('tr.d23 td');
twentyfourths = document.querySelectorAll('tr.d24 td');
twentyfifths = document.querySelectorAll('tr.d25 td');
twentysixths = document.querySelectorAll('tr.d26 td');
twentysevenths = document.querySelectorAll('tr.d27 td');
twentyeighths = document.querySelectorAll('tr.d28 td');
twentyninths = document.querySelectorAll('tr.d29 td');
thirtieths = document.querySelectorAll('tr.d30 td');
thirtyfirsts = document.querySelectorAll('tr.d31 td');

const someArray = [firsts, seconds, thirds, fourths, fifths, sixths, sevenths, eighths, ninths, tenths, elevenths, twelfths, thirteenths, fourteenths, fifteenths, sixteenths, seventeenths, eighteenths, nineteenths, twentieths, twentyfirsts, twentyseconds, twentythirds, twentyfourths, twentyfifths, twentysixths, twentysevenths, twentyeighths, twentyninths, thirtieths, thirtyfirsts];

const testThings = document.getElementsByClassName('testclass');
const myFunction = () => console.log("Test!!!");
for (var i = 0; i < testThings.length; i++) {
    testThings[i].addEventListener('click', myFunction, false);
}


for (let i = 0; i < someArray.length; i++) {
    let x = 1;
    someArray[i].forEach(e => {
        e.classList.add(x < 10 ? `m0${x}` : `m${x}`)
        x++;
    });
}

/* DEPRECATED: Use this for hardcoding individual colors, if desired. 
     //document.querySelector(`.d${day} .m${month}`).style.backgroundColor = `${colors[`${objectOfConcertCounts[e]}`]}`//Converts the cells' background color into a corresponding color. Change the thing inside the template literal at the end to the outcome of a function that gets a color
const colors = {
    "2": "blue",
    "1": "pink"
}*/