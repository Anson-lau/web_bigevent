$(function(){


    initUserInfo();


    $('.layui-form').on('submit', function(e){
        // console.log('123');
        e.preventDefault();
        editUserInfo();
    })


    
    $('#resetBtn').on('click', function(e){
        e.preventDefault();
        initUserInfo();
    })


    





})

// init user info
function initUserInfo(){

    var form = layui.form;
    var layer = layui.layer;

    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res){

            if(res.status !== 0){
                return layer.msg('It is fail to get user info.');
            }

            form.val('userinfo', {
                "id": res.data.id,
                "username": res.data.username,
                "nickname": res.data.nickname,
                "email": res.data.email
            })

        }
    })
}

// edit user info
function editUserInfo(){

    var layer = layui.layer;
    let id = $('[name=id]').val();
    let nickname = $('[name=nickname]').val();
    let email = $('[name=email]').val();

    $.ajax({
        method: 'POST',
        url: '/my/userinfo',
        data: {
            'id': id,
            'nickname': nickname,
            'email': email            
        },
        success: function(res){

            if(res.status !== 0){
                return layer.msg('It is fail to update user info.');
            }

            // $('.layui-form')[0].reset();

            window.parent.getUserInfo();
        }
    })
}