var mammoth = require("mammoth");

const getHTML = ()=>{
    mammoth
    .convertToHtml({path: "table.docx"})
    .then(function(result){
        console.log(result.value);
        return result.value; // The generated HTML
    })
    .done();
};
 

getHTML()
