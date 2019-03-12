import('moment').then((moment: any) => {
    const time = moment().format('YYYY-MM-DD');
    console.log(time);
}).catch((err: Error) => {
    console.log(err);
});
