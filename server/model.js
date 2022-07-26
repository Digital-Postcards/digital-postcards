class Model{
    array = [];
    constructor(dataArray){
        this.array = dataArray;
    }
    getLength(){
        return this.array.length
    }
    getPostcardFromID(index){
        return this.array[index-1];
    }
}
module.exports = Model;