Promise.resolve().then(() => require('moment')).then((moment) => {
    const time = moment().format('YYYY-MM-DD');
    console.log(time);
}).catch((err) => {
    console.log(err);
});
//# sourceMappingURL=lml.js.map