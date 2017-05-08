var Jimp = require("jimp");

module.exports = (context) => {

    context.log(`Starting...`);

    // Read image with Jimp
    Jimp.read(context.bindings.inputBlob).then((image) => {

        context.log(`Processing...`);

        // Manipulate image
        image
            .resize(100, Jimp.AUTO) 
            .getBuffer(Jimp.MIME_JPEG, (error, stream) => {
                // Check for errors
                if (error) {
                    context.log(`There was an error processing the image.`);
                    context.done(error);
                } else {
                    context.log('Node.JS blob trigger function resized ' + context.bindingData.name + ' to ' + image.bitmap.width + 'x' + image.bitmap.height);
                    context.bindings.outputBlob = stream;
                    context.done();
                }
            });

    }).catch(function (err) {
        context.log(err);
    });

};
