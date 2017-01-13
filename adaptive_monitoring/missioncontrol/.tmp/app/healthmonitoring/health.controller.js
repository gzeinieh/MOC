'use strict';

angular.module('missioncontrolApp').controller('HealthCtrl', function ($scope, $http) {

    $http.get('/api/missions').then(function (response) {
        console.log(response);
        $scope.missions = response.data;
    });

    $scope.selectedMission = "";
    $scope.range = 1;
    $scope.minRange = 1;
    $scope.maxRange = 1000001;
    $scope.step = 100;

    $scope.$watch('selectedMission', function () {

        $http.get('/api/satellites/mission/' + $scope.selectedMission._id).then(function (response) {
            console.log(response);
            if (Array.isArray(response.data)) {
                $scope.satellites = response.data;
            } else {

                $scope.satellites = [];
                $scope.satellites.push(response.data);
            }
        });
    });

    $scope.selectedSatellite = "";

    $scope.$watchGroup(['selectedSatellite', 'satellites', 'range'], function () {

        $scope.sensors = [];
        $scope.sensorData = [];
        $scope.submitMSG = "";
        $scope.reCheck = 0;
        $scope.reCheckMSG = "Plots are Up-To-Date!";
        $scope.visual = 0;
        $scope.categoriesMag3100 = $scope.iniCategory();
        $scope.datasetMag3100 = $scope.iniDataset();
        $scope.categoriesAcc793 = $scope.iniCategory();
        $scope.datasetAcc793 = $scope.iniDataset();
        $scope.trendlinesMag3100 = $scope.iniTrendlines();
        $scope.trendlinesAcc793 = $scope.iniTrendlines();
    });

    $scope.calculateAcc793 = function (x, y, z) {

        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
    };

    $scope.checkMission = function () {

        $http.get('/api/sensors/satellite/' + $scope.selectedSatellite._id + '?limitTo=' + $scope.range).then(function (response) {
            console.log(response);
            if (Array.isArray(response.data)) {
                $scope.sensors = response.data;
            } else {

                $scope.sensors = [];
                $scope.sensors.push(response.data);
            };

            $scope.processData();
        });
    };

    $scope.processData = function () {

        $scope.categoriesMag3100 = $scope.iniCategory();
        $scope.datasetMag3100 = $scope.iniDataset();
        $scope.categoriesAcc793 = $scope.iniCategory();
        $scope.datasetAcc793 = $scope.iniDataset();
        $scope.trendlinesMag3100 = $scope.iniTrendlines();
        $scope.trendlinesAcc793 = $scope.iniTrendlines();

        for (var i = 0; i < $scope.sensors.length; i++) {
            if ($scope.sensors[i].mag3110s.length > 0) {
                $scope.len = $scope.sensors[i].mag3110s.length;
                $scope.sensors[i]["valToCheck"] = $scope.sensors[i].mag3110s[0].sensorReading;

                $scope.attrsMag3100['caption'] = "Mag3100";
                $scope.attrsMag3100['yaxismaxvalue'] = $scope.sensors[i]['max_threshold'] * 1.2;
                $scope.trendlinesMag3100[0]['line'][0]['startvalue'] = $scope.sensors[i]['max_threshold'];
                $scope.trendlinesMag3100[1]['line'][0]['startvalue'] = $scope.sensors[i]['min_threshold'];

                for (var k = 1; k <= $scope.len; k++) {

                    $scope.categoriesMag3100[0]["category"].push({ "label": $scope.sensors[i].mag3110s[$scope.len - k]["createdAt"] });

                    $scope.datasetMag3100[0]["data"].push({ "value": $scope.sensors[i].mag3110s[$scope.len - k].sensorReading.toString() });
                };

                $scope.idx = 2;

                for (var t = 1; t < $scope.sensors[i].Thresholds.length; t++) {

                    $scope.trendlinesMag3100[$scope.idx]['line'][0]['startvalue'] = $scope.sensors[i]['Thresholds'][t]['max_threshold'];
                    $scope.trendlinesMag3100[$scope.idx + 1]['line'][0]['startvalue'] = $scope.sensors[i]['Thresholds'][t]['min_threshold'];
                    $scope.idx = $scope.idx + 2;
                }
            } else if ($scope.sensors[i].acc793s.length > 0) {
                $scope.len = $scope.sensors[i].acc793s.length;
                $scope.sensors[i]["valToCheck"] = $scope.calculateAcc793($scope.sensors[i].acc793s[0].x_value, $scope.sensors[i].acc793s[0].y_value, $scope.sensors[i].acc793s[0].z_value);

                $scope.attrsAcc793['caption'] = "Acc793";
                $scope.attrsAcc793['yaxismaxvalue'] = $scope.sensors[i]['max_threshold'] * 1.2;
                $scope.trendlinesAcc793[0]['line'][0]['startvalue'] = $scope.sensors[i]['max_threshold'];
                $scope.trendlinesAcc793[1]['line'][0]['startvalue'] = $scope.sensors[i]['min_threshold'];

                for (var j = 1; j <= $scope.len; j++) {

                    $scope.categoriesAcc793[0]["category"].push({ "label": $scope.sensors[i].acc793s[$scope.len - j]["createdAt"] });

                    $scope.datasetAcc793[0]["data"].push({ "value": $scope.calculateAcc793($scope.sensors[i].acc793s[$scope.len - j].x_value, $scope.sensors[i].acc793s[$scope.len - j].y_value, $scope.sensors[i].acc793s[$scope.len - j].z_value).toString() });
                };

                $scope.idx = 2;

                for (var t = 1; t < $scope.sensors[i].Thresholds.length; t++) {

                    $scope.trendlinesAcc793[$scope.idx]['line'][0]['startvalue'] = $scope.sensors[i]['Thresholds'][t]['max_threshold'];
                    $scope.trendlinesAcc793[$scope.idx + 1]['line'][0]['startvalue'] = $scope.sensors[i]['Thresholds'][t]['min_threshold'];
                    $scope.idx = $scope.idx + 2;
                }
            }
        }
    };

    $scope.submitMSG = "";
    $scope.reCheck = 0;
    $scope.actSubmitMSG = 1;

    $scope.$watch('sensors', function () {

        if ($scope.actSubmitMSG === 1) {
            $scope.submitMSG = "New thresholds will be lost if you do not submit!";
        };

        $scope.actSubmitMSG = 1;
    }, true);

    $scope.getDateTime = function () {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var second = now.getSeconds();
        if (month.toString().length == 1) {
            var month = '0' + month;
        }
        if (day.toString().length == 1) {
            var day = '0' + day;
        }
        if (hour.toString().length == 1) {
            var hour = '0' + hour;
        }
        if (minute.toString().length == 1) {
            var minute = '0' + minute;
        }
        if (second.toString().length == 1) {
            var second = '0' + second;
        }
        var dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        return dateTime;
    };

    $scope.updateThresholds = function () {

        for (var i = 0; i <= $scope.sensors.length; i++) {

            $http.put('/api/sensors/' + $scope.sensors[i]._id, { "max_threshold": $scope.sensors[i].max_threshold, "min_threshold": $scope.sensors[i].min_threshold }).then(function (response) {
                console.log(response);
                $scope.submitMSG = "Thresholds saved successfuly!";
                $scope.reCheck = 1;
                $scope.reCheckMSG = "Plots are NOT Up-To-Date!";
            });

            $http.post('/api/thresholds', { "max_threshold": $scope.sensors[i].max_threshold, "min_threshold": $scope.sensors[i].min_threshold, "SensorId": $scope.sensors[i]._id, "updatedAt": $scope.getDateTime() }).then(function (response) {
                console.log(response);
            });
        }
    };

    $scope.visual = 0;

    $scope.dataVisualization = function () {

        if ($scope.reCheck === 1) {

            $scope.checkMission();
            $scope.actSubmitMSG = 0;
            $scope.reCheck = 0;
            $scope.reCheckMSG = "Plots are Up-To-Date!";
        };

        $scope.visual = 1;
    };

    $scope.sensorData = [];

    $scope.checkMission2 = function () {
        $scope.sensorData = [];

        for (var i = 0; i <= $scope.sensors.length; i++) {
            $http.get('/api/sensors/sensor_model_data/' + $scope.sensors[i].Sensor_type.model.toLowerCase() + '/sensor/' + $scope.sensors[i]._id).then(function (response) {
                console.log(response);
                $scope.sensorData.push(response.data);
            });
        }
    };

    $scope.iniTrendlines = function () {

        var trendlines = [{
            "line": [{
                "startvalue": "",
                "color": "#008ee4",
                "valueOnRight": "1"
            }]
        }, {
            "line": [{
                "startvalue": "",
                "color": "#e44a00",
                "valueOnRight": "1"
            }]
        }, {
            "line": [{
                "startvalue": "",
                "color": "#008ee4",
                "valueOnRight": "1",
                "alpha": "40",
                "displayvalue": "  "
            }]
        }, {
            "line": [{
                "startvalue": "",
                "color": "#e44a00",
                "valueOnRight": "1",
                "alpha": "40",
                "displayvalue": "  "
            }]
        }, {
            "line": [{
                "startvalue": "",
                "color": "#008ee4",
                "valueOnRight": "1",
                "alpha": "30",
                "displayvalue": "  "
            }]
        }, {
            "line": [{
                "startvalue": "",
                "color": "#e44a00",
                "valueOnRight": "1",
                "alpha": "30",
                "displayvalue": "  "
            }]
        }, {
            "line": [{
                "startvalue": "",
                "color": "#008ee4",
                "valueOnRight": "1",
                "alpha": "30",
                "displayvalue": "  "
            }]
        }, {
            "line": [{
                "startvalue": "",
                "color": "#e44a00",
                "valueOnRight": "1",
                "alpha": "30",
                "displayvalue": "  "
            }]
        }, {
            "line": [{
                "startvalue": "",
                "color": "#008ee4",
                "valueOnRight": "1",
                "alpha": "30",
                "displayvalue": "  "
            }]
        }, {
            "line": [{
                "startvalue": "",
                "color": "#e44a00",
                "valueOnRight": "1",
                "alpha": "30",
                "displayvalue": "  "
            }]
        }, {
            "line": [{
                "startvalue": "",
                "color": "#008ee4",
                "valueOnRight": "1",
                "alpha": "30",
                "displayvalue": "  "
            }]
        }, {
            "line": [{
                "startvalue": "",
                "color": "#e44a00",
                "valueOnRight": "1",
                "alpha": "30",
                "displayvalue": "  "
            }]
        }];

        return trendlines;
    };

    $scope.iniCategory = function () {

        var categories = [{
            "category": []
        }];
        return categories;
    };

    $scope.iniDataset = function () {

        var dataset = [{
            "seriesname": "data",
            "data": []
        }, {
            "seriesname": "Max Threshold",
            "data": []
        }, {
            "seriesname": "Min Threshold",
            "data": []
        }];
        return dataset;
    };

    $scope.iniAttrs = function () {

        var attrs = {
            "exportenabled": "1",
            "exportatclient": "1",
            "exporthandler": "http://export.api3.fusioncharts.com",
            "html5exporthandler": "http://export.api3.fusioncharts.com",
            "caption": "",
            "numberprefix": "",
            "plotgradientcolor": "",
            "bgcolor": "FFFFFF",
            "showalternatehgridcolor": "0",
            "divlinecolor": "CCCCCC",
            "showvalues": "0",
            "showcanvasborder": "0",
            "canvasborderalpha": "0",
            "canvasbordercolor": "CCCCCC",
            "canvasborderthickness": "1",
            "yaxismaxvalue": "50",
            "captionpadding": "30",
            "linethickness": "3",
            "yaxisvaluespadding": "15",
            "legendshadow": "0",
            "legendborderalpha": "0",
            "palettecolors": "#f8bd19,#008ee4,#e44a00,#6baa01,#583e78",
            "showborder": "0"
        };

        return attrs;
    };

    $scope.attrsMag3100 = $scope.iniAttrs();

    $scope.categoriesMag3100 = $scope.iniCategory();

    $scope.datasetMag3100 = $scope.iniDataset();

    $scope.attrsAcc793 = $scope.iniAttrs();

    $scope.categoriesAcc793 = $scope.iniCategory();

    $scope.datasetAcc793 = $scope.iniDataset();

    $scope.trendlinesMag3100 = $scope.iniTrendlines();
    $scope.trendlinesAcc793 = $scope.iniTrendlines();
});
//# sourceMappingURL=health.controller.js.map
