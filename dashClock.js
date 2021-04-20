const timezone = {
    zulu: "zulu",
    eastern: "America/New_York",
    new_york: "America/New_York",
    afghanistan: "Asia/Kabul",
    kabul: "Asia/Kabul",
    bad: "bad",
};

// a is the title of the specific node, b is the timezone of said node.
function dcNode(a,b) {
    return {
        title: a,
        timezone: b,
    };
}

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

function updateClocks() {
    let clocks = document.getElementsByClassName("clock_cell");

    [].forEach.call(clocks, (x) => {
        x.innerHTML = timeFromZone(x.dataset.timezone);
    })
}

function dashClock(elementID, nodes) {
    let table = document.createElement("table");
    
    table.className = "dashClock";

    let title_row = document.createElement("tr");
    let clock_row = document.createElement("tr");

    title_row.id = "title_row";
    clock_row.id = "clock_row";

    nodes.forEach((x) => {
        x.time = timeFromZone(x.timezone);

        let title_cell = document.createElement("td");
        let clock_cell = document.createElement("td");

        title_cell.innerHTML = x.title;
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

    setInterval(() => updateClocks(), 1000);
}