const { fieldErrorResponse } = require('./errorResponses');

//INT Validator
function intValidator(field, input){
    const type = "number";
    if(typeof input === type){
        return true;
    }else{
        return fieldErrorResponse(field, type);
    }
}

//String Validator
function stringValidator(field, input){
    const type = "string";
    if(typeof input === type){
        return true;
    }else{
        return fieldErrorResponse(field, type);
    }
}

//Boolean Validator
function boolValidator(field, input){
    const type = "boolean";
    if(typeof input === type){
        return true;
    }else{
        return fieldErrorResponse(field, type);
    }
}

module.exports = {
    intValidator,
    stringValidator,
    boolValidator
}