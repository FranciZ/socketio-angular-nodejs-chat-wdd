

module.exports = (app)=>{

    require('./message/model');
    require('./message/router')(app);

    require('./room/model');
    require('./room/router')(app);

};