$(document).ready(function (){
    $Ajax('/developer/productOrder/allOrder');
    let $orderManage = $('#orderManage').find('a');
    // $orderManage.eq(1).changeOrder("/developer/productOrder/allOrder");
    // $orderManage.eq(2).changeOrder("/developer/productOrder/waitpPy");
    // $orderManage.eq(3).changeOrder("/developer/productOrder/waitpPy");
    // $orderManage.eq(4).changeOrder("/developer/productOrder/waitpPy");
    f(1,"/developer/productOrder/allOrder");
    f(2,"/developer/productOrder/waitPay");
    f(3,"/developer/productOrder/waitSend");
    f(4,"/developer/productOrder/finished");
    f(5,"/developer/productOrder/productClose");
    function f(index,url){
        $orderManage.eq(index).changeOrder(url);
    }
});




//点击函数
//$.extend()为jq类添加方法，$.fn.extend为jq实例化的对象添加方法
$.fn.extend({
    changeOrder:function (url){
        // console.log(url+"1");
        $(this).click(function (){
            // console.log(url+"2");
            $Ajax(url);

        })
    }
});

//Ajax函数
function $Ajax(url){
    $.ajax({
        type:"GET",
        url:url,
        async:true,
        success:function (data){
            if(data.code === 200){
                if(data.state){
                    alert(data.list);
                    return;
                }
                //路径导航
                $('ol.breadcrumb').find('li').eq(1).html(data.str);
                let  list = JSON.parse(data.list);

                let tr= "";
                for(let i = 0; i < list.length; i++){
                    tr += "<tr>" +
                        "<td>" +
                        list[i].orderNum +
                        "</td>" +
                        "<td>" +
                        list[i].productName +
                        "</td>" +
                        "<td>" +
                        list[i].price +
                        "</td>" +
                        "<td>" +
                        list[i].downTime +
                        "</td>" +
                        "<td>" +
                        list[i].state +
                    "</td>" +
                    "</tr>"
                }

                $('#orderList').html(tr)
            }else{
                console.log('返回状态码不是200');
            }
        },
        error:function (){
            console.log("连接失败");
        }

    })
}