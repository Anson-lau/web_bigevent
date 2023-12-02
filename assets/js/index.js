$(function(){

    getUserInfo();

    let flag = true;

    // todo
    $('.layui-logo').on('click', function(){
        // console.log('123');
        if(flag){
            $('.layui-side').hide();
            $('.layui-logo i')[0].classList.remove('layui-icon-shrink-right');
            $('.layui-logo i')[0].classList.add('layui-icon-spread-left');
            flag = false;
        }else{
            $('.layui-side').show();
            $('.layui-logo i')[0].classList.remove('layui-icon-spread-left');
            $('.layui-logo i')[0].classList.add('layui-icon-shrink-right');
            flag = true;
        }
    })

    // logout the system
    $('#logout').on('click', function(){
        localStorage.removeItem('token');
        location.href = '/login.html';
    })



})


// get user information
function getUserInfo(){

        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res){
                console.log(res);
                if(res.status !== 0){
                    return layui.layer.msg(res.message);
                }

                renderAvatar(res.data);

                // $('.layui-nav-img').attr('src', res.data.usesr_pic);
                // let username = res.data.username;
                // let firstLetter = username[0].toUppercase();

            },
            complete: function(res){
                if(res.responseJSON.status === 1){
                    localStorage.removeItem('token');
                    location.href = '/login.html';
                }
            }
        })


}


// render icon and username
function renderAvatar(user){

    let name = user.nickname || user.username; 

    $('#welcome').html('&nbsp;歡迎&nbsp;&nbsp;'+name);

    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    }else{
        $('.layui-nav-img').hide();
        let firstLetter = name[0].toUpperCase();
        $('.text-avatar').html(firstLetter).show();
    }
}



