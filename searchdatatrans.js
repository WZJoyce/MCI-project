var data1= {"RepositoryPath":["01","02","03","04"],"AnchorText":["0001","0020","006","008"]};
var data=[]
for (var i = 0; i < 
   data1.RepositoryPath.length; i++) {
    data.push({
        "Repository Path": data1.RepositoryPath[i],
        
        "Anchor Text":  data1.AnchorText[i]
    });
}
console.log(data);