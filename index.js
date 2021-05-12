var mammoth = require("mammoth");

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
 

getRawText()
.then(result => console.log(convertTextToArray(result)));
