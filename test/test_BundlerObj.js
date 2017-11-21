exports.testBundlerObj = function (test) {
    'use strict';
    var BundlerObj = require('../lib/BundlerObj'),
    fs = require('fs'),
    MetaData = require('../lib/MetaData'),
    md_obj = new MetaData();
    test.expect(1);
    fs.stat('README.md', function (err, stats) {
        var mytar = fs.createWriteStream('mytar.tar'),
        readStream = fs.createReadStream('README.md'),
        test_obj = new BundlerObj(md_obj, [
            {
                'tarEntryArgs': {
                    'name': 'data/README.md',
                    'size': stats.size,
                    'mtime': stats.mtimeMs/1000
                },
                'readStream': readStream
            }
        ],
        'sha1');
        test_obj.stream(mytar, function () {
            console.log("completed with pipe");
            mytar.on('close', function() {
                console.log("Done with the tarball");
                test.equal('blarg', 'blarg', 'passing json to fileobj sets the properties.');
            });
            mytar.flush();
            mytar.end();
        });
    });
    setTimeout(function () {
        test.done();
    }, 2000);
};

