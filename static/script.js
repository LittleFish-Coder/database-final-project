var mapsAPIKey = "AIzaSyC2Z_1g1BlZ_mHK2d9sB2eRNoZb8OxqZ1k";
var testData;
var bikeStationList = [];
var busStationList = [];
var route_url = null;

function boom() {
  console.log("boom!");
}

function test() {
  fetch("/test")
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // right now you get the return data (usually data are in json format)

      // and then you can store the data to a variable, and make sure you decode the json data
      testData = data; // testData now becomes {'message': 'This is a test'}
      console.log(Object.keys(testData)); // see how many keys the object has

      document.getElementById("test").innerHTML = testData["message"]; //show the message
    })
    .catch((error) => console.error(error));
}

function dbTest() {
  fetch("/db/test")
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // right now you get the return data (usually data are in json format)
      document.getElementById("database-content").innerHTML = "";
      for (i = 0; i < data.length; i++) {
        document.getElementById("database-content").innerHTML +=
          data[i] + "<br />"; //show the message
      }
    })
    .catch((error) => console.error(error));
}

function dbInsert() {
  var testID = document.getElementById("testID").value;
  var testCONTENT = document.getElementById("testCONTENT").value;
  document.getElementById("testID").value = "";
  document.getElementById("testCONTENT").value = "";
  console.log("testID: " + testID);
  console.log("testCONTENT: " + testCONTENT);
  data = { testID, testCONTENT };
  fetch("/db/test/insert", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to submit data");
      }
    })
    .then((json) => {
      console.log(json);
    })
    .catch((error) => {
      console.error(error);
    });

  // fetch("http://127.0.0.1:5000/db/test/insert")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data); // right now you get the return data (usually data are in json format)
  //     console.log(typeof data);
  //     document.getElementById("database-content").innerHTML = data; //show the message
  //   })
  //   .catch((error) => console.error(error));
}

function getBike() {
  fetch("/api/get_bike")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      //save stations info to browser's bikeStationList
      bikeStationList = data.slice();

      // Get the selection list element
      var selectList = document.getElementById("bikeStationList");

      // Loop through the array and create an option element for each object
      for (var i = 0; i < data.length; i++) {
        var option = document.createElement("option");
        option.value = data[i].station_id;
        option.text = data[i].station_name;
        selectList.add(option);
      }
    })
    .catch((error) => console.error(error));
}

function restBike() {
  const selectList = document.getElementById("bikeStationList");
  const selectedIndex = selectList.selectedIndex;
  const selectedValue = selectList.options[selectedIndex].value;
  fetch("/api/rest_bike/" + selectedValue)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // return data from backend
      console.log(Object.keys(data));
      stationName = bikeStationList[selectedIndex].station_name;
      stationAddress = bikeStationList[selectedIndex].station_address;
      posLon = bikeStationList[selectedIndex].position_lon;
      posLat = bikeStationList[selectedIndex].position_lat;

      document.getElementById("bikeStation-information").innerHTML =
        "站點：" +
        stationName +
        "<br />" +
        "站點ID：" +
        data["StationID"] +
        "<br />" +
        "地址：" +
        stationAddress +
        "<br />" +
        "經度：" +
        posLon +
        "<br />" +
        "緯度：" +
        posLat +
        "<br />" +
        "可租借車數: " +
        data["AvailableRentBikes"] +
        "<br />" +
        "剩餘停車格:" +
        data["AvailableReturnBikes"] +
        "<br />" +
        '<a href="https://tdx.transportdata.tw/api/basic/v2/Bike/Availability/City/Tainan">即時查詢自行車服務由TDX提供</a>' +
        "<br />";
    })
    .catch((error) => console.error(error));
}

function getBus() {
  fetch("/api/get_bus")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      //save stations info to browser's busStationList
      busStationList = data.slice();
    })
    .catch((error) => console.error(error));
}

function updateBusRouteID() {
  const selectList = document.getElementById("bus_type");
  const selectedIndex = selectList.selectedIndex;
  const selectedValue = selectList.options[selectedIndex].value;
  const busRouteIDList = document.getElementById("bus_route_id");
  busRouteIDList.innerHTML = "";
  busRouteIDList.innerHTML = '<option value="none">請選擇公車路線</option>';
  for (var i = 0; i < busStationList.length; i++) {
    if (selectedValue == busStationList[i].type) {
      var option = document.createElement("option");
      option.value = busStationList[i].route_id;
      option.text = busStationList[i].route_name;
      busRouteIDList.add(option);
    }
  }
}

function getBusRouteURL() {
  const busRouteIDList = document.getElementById("bus_route_id");
  const selectedIndex = busRouteIDList.selectedIndex;
  const selectedValue = busRouteIDList.options[selectedIndex].value;
  bus_url = busStationList.find((x) => x.route_id == selectedValue).url;
  console.log(bus_url);

  document.getElementById("bus-iframe").src = bus_url;
  document.getElementById("bus-iframe").style.display = "block";
}
