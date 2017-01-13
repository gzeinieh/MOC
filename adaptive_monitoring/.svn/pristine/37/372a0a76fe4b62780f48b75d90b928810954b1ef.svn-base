// tracker.js, by Michael Goldstein
// a satellite tracker API in Javascript implemented using predict

// BEFORE USING:
// * predict must be installed on the server
// * NodeJS must be installed on the server
// * the satellite must be defined in "~/.predict/predict.tle"
// * a station file "~/.predict/.GS_NAME.qth" must be created with proper values

// we use execSync because the command line call needs to be blocking in order
// to get the time for the next call
var execSync = require('child_process').execSync;

// Returns a JSON array of the next num times the specified satellite will pass
// over the specified ground station.
export function getSatellitePassovers(satellite, station, num) {
    var passovers = [];
    let time = 0;
    for(var i = 0; i < num; i++) {
        // call predict and parse output to array
        var commandStart = "predict -p \"" + satellite + "\" ";
        var commandEnd = " -q ~/.predict/" + station + ".qth";
        var parsedPass = parsePassOutput(execSync(commandStart + time
                    + commandEnd).toString());

        time = parsedPass.endTime.getTime() / 1000 + 1000;
        // add pass to generates json
        if(i !== 0) {
     	    passovers.push(parsedPass);
				}
    }

    return passovers;
}

// Returns an object array of the coordinates of the specified satellite
// every minute between the provided times
export function getSatelliteLocations(satellite, startTime, endTime) {
    let command = "predict -f \"" + satellite + "\" " + startTime
        + " " + endTime;
    let locations = parseLocationOutput(execSync(command).toString());
    let interval = 120;
    if(locations.length > interval) {
      let granularity = Math.floor(locations.length / interval);
      let index = 0;
      let i = 0;
      for(i = 0; i < locations.length; i += granularity) {
        locations[index++] = locations[i];
      }
      locations.length = interval;
    }
    return locations;
}

export function getSatelliteCurrentLocation(satellite) {
    let command = "predict -f \"" + satellite + "\"";
    let output = execSync(command).toString();
    let entries = output.split(/[ ,]+/);
    let lat = parseFloat(entries[7].trim());
    let lon = parseFloat(entries[8].trim());
    let loc = {
      latitude: lat,
      longitude: lon
    };
    return loc;
}

export function getSatelliteLocation(satellite, time) {
  let command = "predict -f \"" + satellite + "\" "  + time;
  let output = execSync(command).toString();
  let entries = output.split(/[ ,]+/);
  let lat = parseFloat(entries[7].trim());
  let lon = parseFloat(entries[8].trim());
  let loc = {
    latitude: lat,
    longitude: lon
  };
  return loc;
}

function parsePassOutput(output) {
    // parse the times from the stdout response to the call
    var lines = output.split("\n");
    var firstLine = lines[0];
    var lastLine = lines[lines.length - 2];
    var firstLineEntries = firstLine.split(/[ ,]+/);
    var lastLineEntries = lastLine.split(/[ ,]+/);
    var passStartTime = parseInt(firstLineEntries[0]);
    var passEndTime = parseInt(lastLineEntries[0]);
    var orbitNumber = parseInt(firstLineEntries[10]);

    // add 1 second to the start time for the next call

    // return array of start time, end time, and orbit number
    return {
      startTime: new Date(passStartTime * 1000),
      endTime: new Date(passEndTime * 1000),
      orbitNumber: orbitNumber
    };
}

function parseLocationOutput(output) {
    var locations = [];
    var lines = output.split("\n");
    lines.forEach(function(line) {
        if(line.length < 2)
            return locations;
        var entries = line.split(/[ ,]+/);
        var time = parseInt(entries[0]);
        var lat = parseFloat(entries[7].trim());
        var lon = parseFloat(entries[8].trim());
        var loc = {
            time: time,
            latitude: lat,
            longitude: lon
        };
        locations.push(loc);
    });
    return locations;
}

// var time = Math.round(new Date().getTime() / 1000);
// console.log(getSmoothedSatelliteLocations("OSCAR-11", time, time + 6000));
