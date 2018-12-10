

function dynamicSort(upToDown, key) {
    let sortOrder = 1;
    if( upToDown ) {
        sortOrder = -1;
    }
    return (a, b) => {
        const result = (a[key] < b[key]) ? -1 : (a[key] > b[key]) ? 1 : 0;
        return result * sortOrder;
    }
}


function degr(nemerator, denominator){
    if ( nemerator % denominator !== 0 ) {
        return ( nemerator - nemerator % denominator ) / denominator + 1;
    }  else {
        return nemerator / denominator
    }
}

function setPageCrop(value) {
    const pageCrop = parseInt(value, 10);
    const pageActive = 1;
    return {pageCrop, pageActive}
}

function generateArr(num) {

    let arr = [];
    for (let i = 1; i <= num; i++) {
        arr.push(i)
    }
    return arr;

}

module.exports =  {

    dynamicSort,
    degr,
    setPageCrop,
    generateArr

}