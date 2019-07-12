$(document).ready(function() {

    //var data1= {"RepositoryPath":["01","02","03","04"],"AnchorText":["0001","0020","006","008"]};

    var $table = $('#table');
    var data = [];
    
    for (var i = 1; i <= 40; i++) {
        data.push({
            "Repository Path": i,
            
            "Anchor Text": "111"
        });
    }
    
  
    $table.bootstrapTable({
        iconsPrefix: 'font-icon',
        paginationPreText: '<i class="font-icon font-icon-arrow-left"></i>',
        paginationNextText: '<i class="font-icon font-icon-arrow-right"></i>',
        data: data
    });
});


/*$(document).ready(function() {
    var $table = $('#table');
    var data = [];
    $.ajax({ 
        type:"GET", 
        url:"data.json", 
        dataType:"json", 
        success:function(data){ 
            

            for (var i = 1; i <= 40; i++) {
                data.push({
                    "Repository Path": i,
                    
                    "Anchor Text": "111"
                });
            }
              
        
        //i表示在data中的索引位置，n表示包含的信息的对象 
        
        //获取对象中属性
    
            
        },
                    error : function(error) {
                        alert("error");
                    }
        });

   

    $table.bootstrapTable({
        iconsPrefix: 'font-icon',
        paginationPreText: '<i class="font-icon font-icon-arrow-left"></i>',
        paginationNextText: '<i class="font-icon font-icon-arrow-right"></i>',
        data: data
    });
});*/


/*function ajaxRequest(params){
    $.ajax({
        url:'data.json',
        type:"post",
        dataType:'json',
        success:function(rs){
            console.log(rs)
            var message=rs.array;
            params.success({
                total:rs.tatal,
                row:message
            });
        },
        error:function(rs){
            console.log(rs)
        }
        
    });
    /*var $table=$('#table'),
        $add=$('#add'),
        $refresh=$("#refresh");
    $table.on('check.bs.table uncheck.bs.table'+'check-all.bs.table uncheck-all.bs.table'),
           function(){

           }*/
//}