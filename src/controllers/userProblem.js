const { getLanguageById ,submitBatch,submitToken} = require("../utils/problemUtility");
const Problem=require("../models/problem");      

const createProblem=async (req,res)=>{
    const {title,description,difficulty,tags,visibleTestCases,hiddenTestCases,
            startCode,refSolution} = req.body;
    try{
        for(const {language,completeCode} of refSolution){ 

            const languageId=getLanguageById(language);

            const submissions=visibleTestCases.map((testcases)=>({
                    source_code:completeCode,
                    language_id:languageId,
                    stdin:testcases.input,
                    expected_output:testcases.output                
            }))
            const submitResult=await submitBatch(submissions);
            // we get submit result in this format
//             [
//   {
//     "token": "db54881d-bcf5-4c7b-a2e3-d33fe7e25de7"
//   },
//   {
//     "token": "ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1"
//   },
//   {
//     "token": "1b35ec3b-5776-48ef-b646-d5522bdeb2cc"
//   }
// ]

       const resultToken=submitResult.map((value)=>value.token);
       const testResult=await submitToken(resultToken);

       for(const test of testResult){
        if(test.status_id!=3) return res.status(400).send("Error Occured"); 
       }

        
    }
    // now we can store the data in database
    const userProblem=await Problem.create({
        ...req.body, 
        problemCreator:req.result._id
    })
    res.status(201).send("Problem Saved Successfully");
        
    }
    catch(err){
          console.log(err);
    }
}
module.exports=createProblem;