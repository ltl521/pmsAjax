/**
 * Created by 22682 on 2017/10/30.
 */
//发送验证码
$(".send-code").on("click",function(){
    var phone=$(".phone-number").val();
    if(!phone){
        $(".phone-note").show();
        $(".phone-note>div").html("请输入正确的手机号");
        setTimeout(function(){
            $(".phone-note").hide();
            $(".phone-number").focus();
        },2000);
        return
    }else{
        var reg=/^(0|86|17951)?(13[0-9]|15[0-35-9]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
        if(!(reg.test(phone))){
            $(".phone-note").show();
            $(".phone-note>div").html("请输入正确的手机号");
            setTimeout(function(){
                $(".phone-note").hide();
                $(".phone-number").focus();
            },2000)
        }else{
            var time = 60;  //倒计时5秒
            var timer = setInterval(fun1, 1000);  //设置定时器
            function fun1() {
                time--;
                if(time>=0) {
                    $(".send-code").html(time + "s后重新发送");
                    $(".send-code").attr("disabled","disabled");
                }else{
                    $(".send-code").html("重新发送验证码");
                    $(".send-code").removeAttr("disabled")  //倒计时结束能够重新点击发送的按钮
                    clearTimeout(timer);  //清除定时器
                    time = 60;  //设置循环重新开始条件
                }
            }
            $.ajax({
                type:"post",
                url:sameUrl+"/senSMS",
                data:{"phone":phone},
                dataType:"jsonp",
                jsonp: 'callback',
                jsonpCallback:'senSMS_jsoncallback',
                success:function(result){
                    if(result.resultId==0){
                        $(".phone-note").show();
                        $(".phone-note>div").html(result.resultMsg);
                        setTimeout(function(){
                            $(".phone-note").hide();
                            clearTimeout(timer);  //清除定时器
                            $(".send-code").html("重新发送验证码");
                        },2000);
                    }
                }
            })
        }
    }

});

//确定按钮
$(".login-ok").on("click",function(){
    var phone=$(".phone-number").val();
    var code=$(".phone-code").val();
    if(!code){
        $(".phone-note").show();
        $(".phone-note>div").html("请输入验证码");
        setTimeout(function(){
            $(".phone-note").hide();
        },2000);
        return
    }
    if(!phone){
        $(".phone-note").show();
        $(".phone-note>div").html("请输入正确的手机号");
        setTimeout(function(){
            $(".phone-note").hide();
            $(".phone-number").focus();
        },2000);
        return
    }else{
        var reg=/^(0|86|17951)?(13[0-9]|15[0-35-9]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
        if(!(reg.test(phone))){
            $(".phone-note").show();
            $(".phone-note>div").html("请输入正确的手机号");
            setTimeout(function(){
                $(".phone-note").hide();
                $(".phone-number").focus();
            },2000)
        }else{
            $.ajax({
                type:"post",
                url:sameUrl+"/userValidate",
                data:{"phone":phone,"code":code},
                dataType:"jsonp",
                jsonp:"callback",
                jsonpCallback:"code_jsoncallback",
                success:function(result){
                    if(result.resultId==1){
                        location.href="my-order.html?phone="+phone;
                    }else{
                        $(".phone-note").show();
                        $(".phone-note>div").html(result.resultMsg);
                        setTimeout(function(){
                            $(".phone-note").hide();
                        },2000)
                    }
                }
            })
        }
    }
});