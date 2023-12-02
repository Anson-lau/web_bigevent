$(function(){

    // go to register
    $('#link_reg').on('click', function(){
        $('.reg-box').show();
        $('.login-box').hide();
    })

    // go to login
    $('#link_login').on('click', function(){
        $('.reg-box').hide();
        $('.login-box').show();
    })


    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        verifyUsername: function(value){
            if(value.length < 6) {
               return 'username length is greater than 6'; 
            }
        },
        // verifyPassword: [/^[\S]{6,30}$/, 'password length must are between 6 and 12 without any space'],
        verifyConfirm: function(value){
            var pwd = $('.reg-box [name=password]').val();
            if(value !== pwd){
                return 'it is difference between password and confirmed password';
            } 
        }
    })

    $('#login').on('submit', function(e){

        e.preventDefault();

        $.ajax({

            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res){

                if(res.status !== 0){
                    layer.msg('登錄失敗，請先註冊');
                    $('#link_reg').click();
                    return;
                }

                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })


    $('#register').on('submit', function(e){

        e.preventDefault();

        var data = {
            username: $('#register [name=username]').val(),
            password: $('#register [name=password]').val()
        }

        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: data,
            success: function(res){
                if(res.status !== 0) return layer.msg(res.massage);
                layer.msg(res.massage);
                $('#link_login').click();
            }
        })

    })







})