$(function () {
    let mycookie = document.cookie;
    if (mycookie){
        let a = mycookie.match(/\{.+\}/g);
        $(".name").html(JSON.parse(a[0]).useName);

        $(".n").css("display","none");
        $(".y").css("display","block");
        document.use_id = JSON.parse(a[0]).useName;
        document.dr= JSON.parse(a[0]).status | false;
    }

    new Promise(function (res) {
        let index = location.search.slice(7);
        $.get("./data/get_li.php" + location.search,function (data) {
            return  data;
        }).then(function (data) {
            let Data = JSON.parse(data)[0];
            let url = JSON.parse(Data.url);


            let i = `<div class="info">
               <div class="wap">
                   <div class="left clearfix">
                       <div class="item clearfix">
                           <img src="${url.da[0]}" height="430" width="430" alt="" class="active"/>
                           <img src="${url.da[1]}" height="430" width="430" alt=""/>
                           <img src="${url.da[2]}" height="430" width="430" alt=""/>
                           <img src="${url.da[3]}" height="430" width="430" alt=""/>
                           <img src="${url.da[4]}" height="430" width="430" alt=""/>
                           <div class="huakuai"></div>
                       </div>
                       <div class="tab">
                           <img src="${url.xiao[0]}" height="60" width="60" alt="" class="active"/>
                           <img src="${url.xiao[1]}" height="60" width="60" alt=""/>
                           <img src="${url.xiao[2]}" height="60" width="60" alt=""/>
                           <img src="${url.xiao[3]}" height="60" width="60" alt=""/>
                           <img src="${url.xiao[4]}" height="60" width="60" alt=""/>
                       </div>
                       <div class="fdj">
                           <img src="${url.fdj[0]}" height="800" width="800" class="active"/>
                           <img src="${url.fdj[1]}" height="800" width="800"/>
                           <img src="${url.fdj[2]}" height="800" width="800"/>
                           <img src="${url.fdj[3]}" height="800" width="800"/>
                           <img src="${url.fdj[4]}" height="800" width="800"/>
                       </div>
                   </div>
                   <div class="right clearfix">
                        <div class="title"><h1>${Data.title}</h1></div>
                       <div class="price">
                           <dl class="clearfix">
                               <dt>价格</dt>
                               <dd><em>￥</em><span>${JSON.parse(Data.data).price}</span></dd>
                           </dl>
                       </div>
                       <div class="area">
                           <dl class="clearfix">
                               <dt>运费</dt>
                               <dd>杭州 上城区 满88(20Kg内)包邮 配送规则</dd>
                           </dl>
                       </div>
                       <div class="sum">
                           <div><input type="text" class="inp-sum" value="1">&nbsp;&nbsp;&nbsp;&nbsp;<span class="sub">减一件</span> | <span class="add">加一件</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>剩余库存</span><span class="surplus">${JSON.parse(Data.data).surplus}</span></div>
                          <button class="btn">加入购物车</button>
                       </div>
                   </div>
               </div>
            </div>`;
            $("#wap").append(i)
            return [JSON.parse(Data.data).surplus,Data];
        }).then( res => {

            function Tab(obj) {
                this.list = obj.tab;
                this.item = obj.item;
                this.len =  this.list.length;
                this.itemclass = this.itemclass || "active";
                this.listclass = this.listclass || "active";
                this.index = 0;
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

                            this.list[i].onmouseenter = function () {

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






            };

            new Tab({
                tab: $(".tab").find("img"),
                item: $(".item").find("img")
            });
            new Tab({
                tab: $(".item").find("img"),
                item: $(".fdj").find("img")
            });

            $(".info").find(".item").on("mouseenter",function () {
                $(".fdj").css("display","block");
                $(".huakuai").css("display","block")

            });
            $(".info").find(".item").on(" mouseleave",function () {
                $(".fdj").css("display","none");
                $(".huakuai").css("display","none")
            });
            $(".huakuai").css({
                "width":  ($(".info").find(".item").width() / 800) * $(".info").find(".item").width(),
                "height":  ($(".info").find(".item").height() / 800) * $(".info").find(".item").height()
            });




            $(".info").find(".item").on("mousemove",function (e) {

                let left =  Math.ceil(e.clientX - $(this).offset().left- $(".huakuai").width() / 2) ,
                    top = Math.ceil(e.clientY - $(this).offset().top-$(".huakuai").height() / 2);

                left = Math.max(left,0);
                left = Math.min(left,$(".info").find(".item").width() - $(".huakuai").width());
                top = Math.max(top,0);
                top = Math.min(top,$(".info").find(".item").height() - $(".huakuai").height());

                $(".huakuai").css({
                    left: Math.ceil(left),
                    top: Math.ceil(top)
                });


                $(".fdj").find("img").css({
                    left: -(left / ($(".info").find(".item").width() - $(".huakuai").width()) * (800 - $(".fdj").width())),
                    top: -(top / ($(".info").find(".item").height() - $(".huakuai").height()) * (800 - $(".fdj").height()))
                })




            });

            $(".inp-sum").on("keyup",function () {
                let val = this.value;
                val = typeof parseInt($(this).val()) === "number" ? parseInt( $(this).val() ) : 1;
                val = val === "NaN" ? 1  : val;
                //this.value = this.value >= parseInt($(".surplus").html()) ? $(".surplus").html() : this.value <= 0  ? 1 : 2;
                if ( val >= parseInt($(".surplus")) ) val = parseInt($(".surplus"));
                if ( val <= 0 ) val = 1;
            });
            //数量减1
            $(".sub").on("click",function () {
                if($(".inp-sum").val() === "1") return;
                $(".inp-sum").val($(".inp-sum").val() - 1);
            });
            //数量加1
            $(".add").on("click",function () {

                if(parseInt($(".inp-sum").val()) >= res[0]) return;
                $(".inp-sum").val(parseInt($(".inp-sum").val()) + 1);
            });
            //加入购物车
            $(".btn").on("click",function () {
                //必须先登入
                if (!document.dr) {
                    alert("请先登陆");
                    return;
                }
                let data2 = {
                     "name": res[1].name,
                     "sum": $(".inp-sum").val(),
                    "use_id": document.use_id
                };

                $.post("./data/get_shopping.php",JSON.stringify(data2),function (data) {

                    if (!data) return;

                    let Data = JSON.parse(JSON.parse(data).data);
                    Data[data2.name] = data2.sum;
                    let i = JSON.parse(data);
                    i.data = Data;

                   $.post("./data/set_shopping.php",JSON.stringify(i),function (da) {
                       console.log(da);
                   })
                })
            })
        });
    })

});