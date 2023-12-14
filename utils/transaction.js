let utils;

function getRunningTotal(transactions) {
    const running_total = transactions.reduce((accumulator, value) => accumulator + value.dolValue, 0);
    return running_total;
};


export default utils = {getRunningTotal};