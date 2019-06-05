$(function () {





    $(".tab-bar").find("li").on("mouseenter",function () {
        $(this).addClass("active").siblings().removeClass("active");

        $($(".tab").find(">div")[$(".tab-bar").find("li").index(this)]).addClass("active").siblings().removeClass("active");

    });

let active = [false,false];
    let color = ["#e54077","#427def","#634ded","#e54077","#634ded","#427def","#fa5c5c",
        "#f7a831","#f7a831","#427def","#dd2727","#427def","#f7a831","#3bc7b0","#dd2727","#3bc7b0"];
    $(".tab").find(".tab1>ul>li").on("mouseenter",function () {
        let $this = $(this);
        active[0] = true;
        $this.addClass("active");
        $this.find(".show>a,.show").css("color", color[$(this).index()]);
        $(".tab1-tab").find("li").eq($(this).index()).addClass("active");

        //tab1-tab
        let i = $(".tab1-tab").find("li").eq($(this).index()).find(".p-l,.p-r");
        if (i.text() === ""){
            new Promise((resolve,reject)=>{
                //获取内容
                $.get(`./data/get_bar_text.php?index=p-${$(this).index()}`,data =>{
                    let Data = JSON.parse(data)[0];
                    return JSON.parse(Data.data);
                }).then(function (data) {
                    let Data = JSON.parse(data)[0];
                    return JSON.parse(Data.data);

                }).then(data =>{
                //添加内容
                    for (var key in data) {
                        i.eq(0).append($(`<div class="word-line clearfix"><div class="line-l">${key}</div><div class="line-con"></div></div></div>`));
                        data[key].split("#").forEach((v )=> {
                              $(".word-line").last().find(".line-con").append(`<a href="#">${v}</a>`);

                        });
                        $(".word-line").last().find(".line-con").append('<div class="xian">')
                    }

                })

            })

        }
    });



    $(".tab").find(".tab1>ul>li").on("mouseleave",function () {
        active[0] = false;
        let $this = $(this);
        $this.removeClass("active");
        $this.find(".show>a,.show").css("color", "#fff");
        //二级导航


            $(".tab1-tab").find("li").eq($(this).index()).removeClass("active");

    });

    //banner

    function Tab(obj) {
        this.list = obj.tab;
        this.item = obj.item;
        this.len =  this.list.length;
        this.listclass = this.listclass || "active";
        this.itemclass = this.itemclass || "active";
        this.index = 0;
        this.time = this.time();
        this.exe();
    }

    Tab.prototype = {
        constructor: Tab,

        exe: function(){
            this.addClick();
        },

        addClick: function(){
            for (var i = 0; i < this.len; i++) {

                (function (i) {

                    this.list[i].onclick = function () {

                        this.change(i)
                    }.bind(this)

                }).call(this,i);

            }
        },

        change: function (i) {
            if(i === this.index) return;
            this.list[this.index].classList.remove(this.listclass);
            this.item[this.index].classList.remove(this.itemclass);
            this.index = i;
            this.list[this.index].classList.add(this.listclass);
            this.item[this.index].classList.add(this.itemclass);
        },

        time: function () {
            return setInterval(function () {
                let i = this.index;
                i++;
                i %= this.len;
                this.change(i)
            }.bind(this),3000)
        },
// //移入取消定时器
        mouseenter(){
            this.item.parent().on("mouseenter",function () {
                clearInterval(this.time);
                console.log("取消定时器");
            }.bind(this))
        },
        mouseleave (){
            this.item.parent().on("mouseleave",function () {
                this.time = this.time();
                console.log("添加计时器");
            }.bind(this))
        }




    };
    let oTab = new Tab({
        tab: $(".bb"),
        item: $(".banner1").find("img")
    });
    new Tab({
        tab: $(".r-top-tab").find(">div"),
        item: $(".r-top-bar").find(".i")
    });
    //li


    // let arr1 = ["","三只松鼠 每日坚果750g/30天装混合坚果礼盒网红坚果零食大礼包","雀巢咖啡1+2 微研磨原味100条装 即溶速溶咖啡冲调饮品","妮维雅防晒喷雾女男士防紫外线SPF50+身体隔离霜学生党全身大瓶",
    //         "美即牛奶嫩肤润颜亮白10片装精品热卖（正品面膜护肤）","Matin Rosie/玛汀露丝沐浴露深海活泉·控油清爽沐浴露520ML","清风湿巾纯水80片装婴儿儿童手口带盖湿纸巾不含酒精"];
    // let arr2 = ["","￥138","￥109","￥89","￥49","￥39.9","￥9.9"];
    //
    //
    // for (let i = 1; i < 7; i++) {
    //     let data ={
    //         name: "O-" + i,
    //         title: arr1[i],
    //         url: `{
    //             "xiao": ["./img/id${i}-x-1.jpg","./img/id${i}-x-2.jpg","./img/id${i}-x-3.jpg","./img/id${i}-x-4.jpg","./img/id${i}-x-5.jpg"],
    //             "da": ["./img/id${i}-d-1.jpg","./img/id${i}-d-2.jpg","./img/id${i}-d-3.jpg","./img/id${i}-d-4.jpg","./img/id${i}-d-5.jpg"],
    //             "fdj": ["./img/id${i}-fdj-1.jpg","./img/id${i}-fdj-2.jpg","./img/id${i}-fdj-3.jpg","./img/id${i}-fdj-4.jpg","./img/id${i}-fdj-5.jpg"]
    //         }`,
    //         data:  `{"price": "${arr2[i]}"}`
    //     };
    //     $.post("./data/push.php",JSON.stringify(data));
    //
    //     console.log("插入" + i + "条");
    // }

    function fn() {
           for (let i = 1; i < 31; i++) {
               $.get("data/get_li.php?index=TB" + i,function (data) {
                   Data = JSON.parse(data)[0];
                   let i = `<li>
                         <div class="li-wap">
                            <div class="name">
                                <img src="${Data.url}" alt="">
                            </div>
                            <div class="show">
                            <a href="#">
                                <p>${Data.title}</p>
                                <span>点击进入</span>
                            </a>
                            </div>
                         </div>
                      </li>`;

                   $(".li").find("ul").append(i);
               })
           }

       }

       new Promise(function () {
           fn();
       }).then(
           "2".log
       );

        $.get("./data/get_li.php?index=O-pic",function (data) {
            Data = JSON.parse(data);
            $(".r-top-r").each((i,v)=>{
                $(v).html(`<a href="./info.html?index=O-${i+1}">
                    <div>
                         <div><img src="${Data[i].url}" alt=""></div>
                         <div><p>${Data[i].title}</p></div>
                         <div><span>${JSON.parse(Data[i].data).price}</span></div>
                    </div></a>`);

            })
        });


});




