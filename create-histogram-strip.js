#!/Users/jon.boydell/.nman/node/v4.1.0/bin/node
var fs = require('fs')
  , gm = require('gm').subClass({imageMagick: true});

  var sys = require('sys')
  var exec = require('child_process').exec;
  var child;
  // executes `pwd`
  child = exec("convert temp.jpg -colorspace HSL -format %c -define histogram:unique-colors=true histogram:info:-");

  child.stdout.setEncoding("utf-8");

  var buffer = [];

  var c = "";

  var array = [];

    child.stdout.on('data', function(data) {
        buffer.push(data);
        c = c + data;
        console.log(data);
    });

child.stdout.on('end', function(){
    var imageMagick = new gm();
    imageMagick.command('convert');
    array = c.split("\n");
    for (var i = 0; i < array.length; i++)
    {
        var re = new RegExp("hsl\(.*\)");
        var str = array[i];
        var x = re.exec(str);
        if (x) {
            console.log(x[0]);
            var command = "xc:" + x[0];
            imageMagick.in("-size").in("10x200").in(command);
        }
    }
    imageMagick.in("+append")
        .write('image.jpeg', function(err) {
            if (err) console.log(err);
        });
});

/**
var imageMagick = new gm();

imageMagick.command('convert');
for (var i = 0; i < 100; i++)
{
    var command = "xc:hsl("+i+"%, "+i+"%, "+i+"%)";
    imageMagick.in("-size").in("10x200").in(command);
}

imageMagick.in("+append")
    .write('image.jpeg', function(err) {
        if (err) console.log(err);
    });
**/
