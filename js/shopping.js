$(function () {

    let mycookie = document.cookie;
    if (mycookie){
        let a = mycookie.match(/\{.+\}/g);
        $(".name").html(JSON.parse(a[0]).useName);
        $(".n").css("display","none");
        $(".y").css("display","block");
        document.use_id = JSON.parse(a[0]).useName;
    } else {
        alert("请先登入");
        return ;
    }


    new Promise(function () {
        let i = {
            "use_id": document.use_id,
        };
        $.get(`./data/get_shopping2.php?use_id=${i.use_id}`, data=> {
        }).then(res => {
            let Data = JSON.parse(res)[0];

            let str = "";
            for (var key in JSON.parse(Data.data)) {
                str = str.concat('"',key,'"',',');
            }
           str = str.slice(0,-1);
            new Promise (function () {
                $.get("./data/get_in.php?index=" + str,function (res) {
                    let json = JSON.parse(res);
                    for (let i = 0; i < json.length; i++) {
                        let dd = ` <div data-flag="true" class="clearfix item">
                        <div class="checkbox">
                            <input type="checkbox" checked="false">
                        </div>
                        <div class="pic">
                            <img src="${JSON.parse(json[i].url).da[0]}" height="100" width="100"/>
                        </div>
                        <div class="title">
                            <p>${json[i].title}</p>
                        </div>
                        <div class="price">
                            <span class="T">${JSON.parse(json[i].data).price}</span><span>元</span>
                        </div>
                        <div class="sum">
                            <span>数量：</span><span class="T" data-sum="${JSON.parse(json[i].data).surplus}">${JSON.parse(Data.data)[json[i].name]}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="sub">减一件</span> | <span class="add">加一件</span>
                        </div>
                        <div class="total">
                            小计 <span class="T">${JSON.parse(json[i].data).price * JSON.parse(Data.data)[json[i].name]}元</span>
                        </div>
                        <div class="del">
                            <button>删除</button>
                        </div>
                    </div>`;
                        $(".shopping").append(dd);
                        //console.log(JSON.parse(json[i].data).surplus);
                    }


                }).then( res => {

                    $(".top").find("input").on("click",function () {
                        $(".shopping").find("input").prop("checked",$(this).prop("checked"));
                        $(".shopping").find(".item").attr("data-flag",$(this).prop("checked"))
                        fn();
                    });
                    $(".shopping").find("input").on("click",function () {
                        $(this).parent().parent().attr("data-flag",$(this).prop("checked"));
                        fn();
                    });
                    console.log($(".shopping").find("[data-flag='true']"));

                    //初始化
                    function fn() {
                        let arr = [];
                        let s = 0;
                        $(".shopping").find("[data-flag='true']").each((i,v)=>{
                            let it = $(v);
                            it.find(".total").find(".T").html((it.find(".sum").find(".T").html() * it.find(".price").find(".T").html()).toFixed(2));
                            arr[i] = it.find(".total").find(".T").html();
                        });

                        arr.forEach(function(val) {
                                s += parseInt(val);
                            });
                            $(".total-val").html(s.toFixed(2))
                    }

                    fn();

                    $(".sub").on("click",function () {
                        if($(this).siblings().eq(1).html() === "1") return;
                        $(this).siblings().eq(1).html($(this).siblings().eq(1).html() - 1);
                        fn();
                    });
                    //数量加1
                    $(".add").on("click",function () {
                        // console.log($(this).siblings().eq(1).attr("data-sum"));
                        if(parseInt($(this).siblings().eq(1).html()) >= $(this).siblings().eq(1).attr("data-sum")) return;
                        $(this).siblings().eq(1).html(parseInt($(this).siblings().eq(1).html()) + 1);
                        fn();
                    });

            }).then(function () {


                })


            })
        })
    })
});