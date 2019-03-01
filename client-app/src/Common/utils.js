export const uuid = () => {
    /*jshint bitwise:false */
    let i, random;
    let uuid = '';

    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            uuid += '-';
        }
        uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
            .toString(16);
    }

    return uuid;
};

export const combineDateAndTime = (date, time) => {
    const timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Jan is 0, dec is 11
    const day = date.getDate();
    const dateString = '' + year + '-' + month + '-' + day;
    return new Date(dateString + ' ' + timeString);
};