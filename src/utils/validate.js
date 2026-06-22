const validator=require("validator");

function validate(data){

    const mandatoryFeilds=["firstName","emailId","password"];
    const arr=Object.keys(data);

    const isAllowed=mandatoryFeilds.every((k)=>arr.includes(k));
    if(!isAllowed){
        throw new Error("Missing Feild");
    }
    if(!validator.isStrongPassword(data.password)){
        throw new Error("Weak Password");
    }
    if(!validator.isEmail(data.emailId)){
        throw new Error("Invalid Email");
    }
}
module.exports=validate;