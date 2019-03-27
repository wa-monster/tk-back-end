/*
//可以自定义样式
<button id="addbtn">添加图片</button>


<div id="mask">
    <div id="mask-content">
        <label for="mask-pic" class="mask-upload">
            上传图片
        </label>
        <input type="file" name="pic" id="mask-pic">
        <img class="mask-picpng" src="/img/a.png" width="150" alt="上传图片">

        <button id="q">确定</button>

    </div>
</div>


new yMask('点击出现的元素','要出现的元素'，{'一些配置'})
* */

;
!function (global) {
    'use strict';
    function yMask(el1,el2,options) {
        this.options = {
            startDisplay:'none',
            animate:200,
            maskPosition:"fixed",
            maskLeft:'0px',
            maskTop:'0px',
            maskBackgroundColor:'rgba(0,0,0,0.7)',
            maskWidth:'100%',
            maskHeight:document.documentElement.clientHeight+"px",
            maskZindex:1000,

        };
        //自定义参数和默认参数合并;
        if(options){
            this.options = this.extend(this.options,options);
        }



        this.el1 = typeof el1 === 'string'? document.querySelector(el1) : el1;
        this.el2 = typeof el2 === 'string'? document.querySelector(el2) : el2;


        this.elcss('display','startDisplay')
            .elcss('position','maskPosition')
            .elcss('left','maskLeft')
            .elcss('top','maskTop')
            .elcss('backgroundColor','maskBackgroundColor')
            .elcss('width','maskWidth')
            .elcss('height','maskHeight')
            .elcss('zIndex','maskZindex');

        //初始化
        this.init();
    }


    yMask.prototype = {
        //参数合并用于设定参数
        extend:function(obj1,obj2){
            for(let i in obj2){
                obj1[i] = obj2[i];
            }
            //返回值
            return obj1;
        },
        showMask:function () {

            let _this = this.el2;
            this.el1.addEventListener('click',function () {
                //隐藏浏览器滚动条
                document.documentElement.style.overflowY = 'hidden';
                _this.style.display = 'block';
            })
        },
        hiddenMask:function () {

            this.el2.addEventListener('click',function (e) {
                //防止点击内层div也生效
                if(e.target!==this){
                    return;
                }
                //显示浏览器滚动条
                document.documentElement.style.overflowY = 'auto';
                this.style.display = 'none';
                // this.preventDefault();
            },true)
        },
        elcss:function (key,value) {

            // console.log(this.options.startDisplay);
            this.el2.style[key] = this.options[value];
            return this;

        },
        init:function (){
            this.hiddenMask();
            this.showMask();
        },
        clickEl2:function (){
            this.el2.click();
        },
        clickEl1:function () {
            this.el1.click();
        },

    };




    //common规范
    if(typeof module !=='undefined' && module.exports){
        module.exports = yMask;
    }

    //AMD/CMD规范
    if(typeof define === 'function') define(function(){
       return yMask;
    });
    global.yMask = yMask;

}(this);