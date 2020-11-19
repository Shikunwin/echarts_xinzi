// 判断屏幕大小
window.onresize = function () {
    var html = document.documentElement;
    var w = html.clientWidth;
    if (w < 1280) {
        w = 1280;
    }
    console.log(w);
};




// // 存数据  测试
// var list = [
//     {
//         uname: "张三",
//         fen: 78,
//         xinzi: 10,
//     }, {
//         uname: "李四",
//         fen: 78,
//         xinzi: 10,
//     }, {
//         uname: "王五",
//         fen: 78,
//         xinzi: 10,
//     },

// ]

// // 存，转换为josn格式
// localStorage.setItem("chengji", JSON.stringify(list))



var list;
getList();

function getList() {
    // 联动
    // 声明数组
    var name_every = [];//名字
    var fen_number = [];//分数
    var xin_zi = [];//薪资
    // 非空判断
    var str = localStorage.getItem("chengji") || "[]";
    // 转换为数组
    list = JSON.parse(str);

    // 置空
    $("tbody tr").html("");

    // 循环遍历
    $.each(list, function (i, one) {
        var tr;
        tr = $(`<tr>
                <td>${one.uname}</td>
                <td>${one.fen}</td>
                <td>${one.xinzi}</td>
                <td><img src="./imgs/del.png" index=${i}></td>
            </tr>`)
        $("#chengji").append(tr);
        // 联动
        // 传入数组中
        name_every.push(one.uname);
        fen_number.push(one.fen);
        xin_zi.push(one.xinzi);
    })
    // 联动
    // 传参
    ech1(name_every, fen_number);
    ech2(name_every, xin_zi);
}

// ---------------------------------------------新增
$(".staff button").on("click", function () {
    // 输入的是三个值都为空-取反-继续执行下面的
    if ($("#username").val() !== "" && $("#userpingfen").val() !== "" && $("#userxinzi").val() !== "") {




        // 准备新的数据
        var one = {};
        // 获取input内文本
        one.uname = $("#username").val();
        one.fen = $("#userpingfen").val();
        one.xinzi = $("#userxinzi").val();

        // 判断输入的是否为数字
        var number_Yes = /^[0-9]+$/;
        if (number_Yes.test(one.fen) && number_Yes.test(one.xinzi)) {
            // 添加到新的list里面
            list.unshift(one);
            localStorage.setItem("chengji", JSON.stringify(list));
            // 将input内内容置空
            one.uname = $("#username").val("");
            one.fen = $("#userpingfen").val("");
            one.xinzi = $("#userxinzi").val("");
            getList();
        }
        else {
            alert("输入的评分或薪资有误")
        }


    }
    else {
        alert("输入的不能为空")
    }
})

// ----------------------------------------删除
// 事件委托：JQ父级.on(事件类型, "选择子元素CSS选择器", function(params) {});
$("#chengji").on("click", "img", function (e) {
    // 绑定自定义属性
    var index = $(e.target).attr("index");
    // 找到数组对应位置进行删除
    list.splice(index, 1);
    // 存回本地
    localStorage.setItem("chengji", JSON.stringify(list));

    // 加载  调用
    getList();


})





















// 右上echarts                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
function ech1(name_every, fen_number) {
    var scoreChart = echarts.init(document.getElementById('score'));
    var option1 = {
        color: {// 渐变色
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: '#F9FAFC' // 0% 处的颜色
            }, {
                offset: 1, color: '#0B68D0' // 100% 处的颜色
            }],
            global: false // 缺省为 false
        },
        tooltip: {
            trigger: 'item',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '1%',
            right: '0%',
            bottom: '2%',
            top: "6%",
            containLabel: true,
        },
        xAxis: [
            {
                type: 'category',
                data: name_every,// 名字形参
                // 刻度设置
                axisTick: {
                    alignWithLabel: true,   // 刻度是否和label对齐
                    show: true
                },
                // 文字颜色
                axisLabel: {
                    color: '#fff'//#4c9bfd 蓝色
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                        width: 1,//坐标轴宽度
                    }

                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                // 文字颜色
                axisLabel: {
                    color: '#fff'
                },
                //分割线
                splitLine: {
                    show: false
                },
                //坐标边框颜色
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                    }
                },

            }
        ],
        series: [
            {
                name: '直接访问',
                type: 'bar',
                barWidth: '60%',
                data: fen_number,//  分数形参
            }
        ]
    };
    // 调用
    scoreChart.setOption(option1);
}



//------------------------------------------------ 线性
function ech2(name_every, xin_zi) {
    var salaryChart = echarts.init(document.getElementById('salary'));
    var option2 = {
        color: {// 渐变色
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0, color: '#F9FAFC' // 0% 处的颜色
            }, {
                offset: 1, color: '#0B68D0' // 100% 处的颜色
            }],
            global: false // 缺省为 false
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '1%',
            right: '0%',
            bottom: '2%',
            top: "6%",
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: '#fff',
                    width: 1,//坐标轴宽度
                }
            },
            // 刻度设置
            axisTick: {
                alignWithLabel: true,   // 刻度是否和label对齐
                show: true
            },
            data: name_every,//名字形参

        },
        yAxis: {
            type: 'value',
            //分割线
            splitLine: {
                show: false
            },
            //坐标边框颜色
            axisLine: {
                lineStyle: {
                    color: '#fff',
                }

            }
        },
        series: [{
            data: xin_zi,//  薪资形参
            type: 'line',
            areaStyle: {},
            smooth: true,
        }]
    };
    // 调用
    salaryChart.setOption(option2);
}