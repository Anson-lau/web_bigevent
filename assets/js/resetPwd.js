$(function(){


    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        verifySamePwd: function(value){
            var oldPwd = $('[name=oldPwd]').val();
            if(value === oldPwd){
                return 'it is not same with the old password';
            }
        },
        verifyConfirmPwd: function(value){
            var pwd = $('[name=newPwd]').val();
            if(value !== pwd){
                // console.log('123');
                return 'it is difference between password and password confirmed';
            }
        }
    })



    $('.layui-form').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: {
                'oldPwd': $('[name=oldPwd]').val(),
                'newPwd': $('[name=newPwd]').val() 
            },
            success: function(res){
                if(res.status !== 0){
                    return layer.msg('it is fail to change password');
                }

               $('.layui-form')[0].reset();
            }
        })
    })



})



