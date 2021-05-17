var mammoth = require("mammoth");
console.log("parsing");

let classes = [];
let rawDataInArray;





const getRawText = ()=>{
    return (mammoth
    .extractRawText({path: "table2.docx"})
    .then(function(result){
        return result.value; // The generated HTML
    }));

}

const convertTextToArray = (text)=>{
    return text.split("\n\n");
}
 
const stripEmptyElementsFromArray = (arr)=>{
    let strippedArray = arr.filter((e)=>{
        return e !== '' && e !== '(Term 1)';
    });

    return strippedArray;
}


const createClasses = ()=>{

    return new Promise((resolve,reject)=>{
    getRawText()
    .then(result => {
            rawDataInArray = convertTextToArray(result);
            rawDataInArray = stripEmptyElementsFromArray(rawDataInArray);
            console.log(rawDataInArray);
            let nameColumn;
            let classColumn;
    
            rawDataInArray.forEach((element,index,arr) => {
                console.log(element);
                if(element === 'First Name'){
                    nameColumn = index;
                    console.log("Namecolumn",nameColumn);
                }  
                else if(element === 'Class '){
                    classColumn = index;
                    console.log("Classcolumn",classColumn);
                } 
            
                else if (index % 6 === nameColumn){
                    let studentName = element;
                    let studentClassName = arr[index-2];
                    console.log(element,studentClassName);
    
                    if(!classes.find(c => c.name === studentClassName)){
                        classes.push({name:studentClassName,students:[]});
                    }
    
                    let classObject = classes.find(c => c.name === studentClassName);
                    classObject.students.push(studentName);
    
                }
             });
             resolve("createdClasses");
             
        }
    )
    }
    )
}

const getClasses = ()=>{
    return new Promise((resolve,reject)=>{
        createClasses().then((res)=>{
            resolve(classes);
        }); 
        
    })  
};

exports.getClasses = getClasses;