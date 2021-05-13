var mammoth = require("mammoth");

let classes = [];
let rawDataInArray;

const getRawText = ()=>{
    return (mammoth
    .extractRawText({path: "table.docx"})
    .then(function(result){
        console.log(result.value);
        return result.value; // The generated HTML
    }));
   
};

const convertTextToArray = (text)=>{
    return text.split("\n\n");
}
 
const stripEmptyElementsFromArray = (arr)=>{
    let strippedArray = arr.filter((e)=>{
        return e !== '';
    });

    return strippedArray;
}


getRawText()
.then(result => {
        rawDataInArray = convertTextToArray(result);
        rawDataInArray = stripEmptyElementsFromArray(rawDataInArray);
        console.log(rawDataInArray);
        rawDataInArray.forEach((element,index) => {
            if(element === 'Name'){
                console.log(`Name column is number ${index}`);
            }  
            else if(element === 'Class'){
                console.log(`Class column is number ${index}`);
            } 
            else{
                console.log(`${element} is in column ${index}`);
            }
            
            
         });
    }
)

