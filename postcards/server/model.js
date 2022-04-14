class Model{
    array = [];
    constructor(dataArray){
        this.array = dataArray;
    }
    getLength(){
        return this.array.length
    }
    getPostcardFromID(index){
        return this.array[index];
    }
}
module.exports = Model;