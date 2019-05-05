const HyperionNg = require('hyperion-ng-api');
const Domoticz = require('./node_modules/domoticz-api/api/domoticz');

//Host, Port, WsTan, Priority (Use 1 if you want to overwrite WebUI priority. Remember WebUI is always priority 1.)
hyperion = new HyperionNg('192.168.0.5', 8090, 1, 2);
api = new Domoticz({protocole: "http", host: "192.168.0.4", port: 8081});

api.getDevice({
	    idx: 92
}, function (err, device) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    luxRaw = device.results[0].data;
    lux = parseInt(luxRaw.split()[0]);

    var brightness = 50;
    if (lux > 1000) {
        brightness = 100;
    } else if (lux > 500) {
        brightness = 80;
    }
    console.log('Setting brightness to ' + brightness)
    hyperion.setBrightness(brightness, function (err, data){
        if (err) {
            console.log(err);
            process.exit(1);
        }
    })
});
