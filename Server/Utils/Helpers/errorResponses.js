const c = require('./coloredLogs');

//ID Error Response Helper 
function idErrorResponse(){
    console.log(`${c.f.s} Failiure: ID Not Found ${c.f.e}`);
    const err = new Error("ID Not Found");
    return err
}

//Field Error Response Helper 
function fieldErrorResponse(field, type){
    if(type){
        console.log(`${c.f.s} Failiure: ${field} is not a ${type} ${c.f.e}`);
        const err = new Error(`${field} is not a ${type}`);
        return err
    }else{
        console.log(`${c.f.s} Failiure: ${field} is required ${c.f.e}`);
        const err = new Error(`${field} is required`);
        return err
    }
}

//Authentication Error Response Helper 
function authErrorResponse(){
    console.log("Failiure");
    const err = new Error("Failed to Authenticate, You have no access");
    return err
}

//Unique Error Response Helper 
function uniqueErrorResponse(){
    console.log(`${c.f.s} Failiure: Input is Not Unique ${c.f.e}`);
    const err = new Error("Input is Not Unique");
    return err
}

module.exports = {
    idErrorResponse,
    fieldErrorResponse,
    authErrorResponse,
    uniqueErrorResponse
}