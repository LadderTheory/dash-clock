// add necessary timezones here
const timezone = {
    "Zulu": "zulu",
    "Boston": "America/New_York",
    "New York": "America/New_York",
    "Afganistan": "Asia/Kabul",
    "Italy": "cet",
    "평양": "Asia/Pyongyang",
    bad: "bad",//test fail on purpose
};

// returns json data that is in the proper format for the dashClock function. a is the title of the specific node, b is the timezone of said node.
function dcNode(a,b) {
    return {
        title: a,
        timezone: b,
    };
}

// arg is the string value of the timezone. Timezones can be found in the csv file or the csvjson file
function timeFromZone(arg) {
    let options = {
        timeZone: arg,
        hour12: false,
        hour: "numeric",
        minute: 'numeric',
        second: 'numeric',
    }

    let return_value;

    try {
        // this is the magic function. It takes those options and creates a custom formatter, and it will auto convert to whatever timezone is supplied.
        let formatter = Intl.DateTimeFormat([], options);

        return_value = formatter.format(new Date());
    } catch {
        return_value = "INVALID TIMEZONE";
    }

    return return_value;
}

// function to update the clocks. use with the setInterval function
function updateClocks() {
    let clocks = document.getElementsByClassName("clock_cell");

    // '[]' is used here as slang for 'Array.prototype'. Allows the calling of array functions on non-array collections
    [].forEach.call(clocks, (x) => {
        x.innerHTML = timeFromZone(x.dataset.timezone);
    })
}

// replaces an existing element(elementID) with a table
// nodes is an array containing timezone data formatted with the dcNode function
// interval is the amount of time in milliseconds between each update
function dashClock(elementID, nodes, interval) {
    let table = document.createElement("table");
    
    table.className = "dashClock";

    let title_row = document.createElement("tr");
    let clock_row = document.createElement("tr");

    title_row.className = "title_row";
    clock_row.className = "clock_row";

    nodes.forEach((x) => {
        x.time = timeFromZone(x.timezone);

        let title_cell = document.createElement("td");
        let clock_cell = document.createElement("td");

        title_cell.innerHTML = x.title;
        title_cell.className = "title_cell"
        clock_cell.innerHTML = x.time;
        clock_cell.className = "clock_cell";
        clock_cell.dataset.timezone = x.timezone;

        title_row.appendChild(title_cell);
        clock_row.appendChild(clock_cell);
    });

    table.appendChild(title_row);
    table.appendChild(clock_row);

    let anchor = document.getElementById(elementID);

    anchor.parentNode.replaceChild(table, anchor);

    setInterval(() => updateClocks(), interval);
}