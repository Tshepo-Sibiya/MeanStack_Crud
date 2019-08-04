const mongoose  = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CrudDB', (error) => {
    if(!error) 
        console.log('oh hey well done.. WELLL DONE.. you have successfully connected to mongoDB');
    else 
        console.log('error connecting :' + JSON.stringify(error, undefined, 2));
    
});

module.exports = mongoose;