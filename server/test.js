var models = require('./server.js').models;



models.Profile.findOne({ where: {name: 'Nick'}}, (err, found) => {
    console.log("Znaleziono?", err, found);
})
/*
var toSave = [
    {name: 'Mariusz', email: 'mariuszgajewski@mail.com'},
    {name: 'Mariusz1', email: 'mail@mail.com'},
    {name: 'Mariusz', email: 'mail1@mail.com'},
    {name: 'Mariusz2', email: 'mail2@mail.com'},
    {name: 'Mariusz', email: 'zneta@mail.com'},
    {name: 'Mariusz34', email: 'asf@mail.com'},
    {name: 'Żaneta', email: 'email@mail.com'},
    {name: 'Żaneta2', email: 'mariusz@mariuszgajewski@mail.com'},
    {name: 'Żaneta1', email: 'mariuszgajewski@mail.com'},
    {name: 'Żania', email: 'mariuszgajewski1@mail.com'},
    {name: 'żaneta', email: 'mariuszgajewski2@mail.com'},
    {name: 'mariuszgajewski', email: 'mariuszgajewski3@mail.com'},
    {name: 'mariusz', email: 'mariuszgajewski@mail4.com'},
];
toSave.map(obj => {
    models.Profile.create(obj, (err, created) => {
        console.log("Stworzono?", created);
    })
})

*/

var filter = {
    where: {
        name: {like: 'Mariusz'}
    }, 
    order: 'id ASC', // Porzadkowanie field direction
    limit: 10
};

    models.Profile.destroyAll(filter.where, (err,found) => {
        console.log("Znaleziono?", err, found);
    })