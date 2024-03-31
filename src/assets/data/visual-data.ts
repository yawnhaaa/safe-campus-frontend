export const pieOption = {
    tooltip: {
        trigger: 'item'
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series: [
        {
            name: '黑灰产活跃指数',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
                { value: 335, name: '保健' },
                { value: 310, name: '赌博' },
                { value: 274, name: '虚假服务' },
                { value: 235, name: '投资理财' },
                { value: 500, name: '色情' }
            ].sort(function (a, b) {
                return a.value - b.value;
            }),
            roseType: 'radius',

            labelLine: {

                smooth: 0.2,
                length: 10,
                length2: 20
            },
            itemStyle: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
        }
    ]
};

export const barOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: ['七月', '八月', '九月', '十月', '十一月', '十二月'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '人数(万人)',
            type: 'bar',
            barWidth: '60%',
            data: [340, 435, 420, 389, 380, 330]
        }
    ]
}

export const pie2Option = {
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '5%',
        left: 'center',
        textStyle: {
            color: 'gray'
        }
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center',
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 40,
                    fontWeight: 'bold',
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 3600, name: '华东' },
                { value: 1600, name: '华南' },
                { value: 1400, name: '华中' },
                { value: 600, name: '西北' },
                { value: 1200, name: '西南' },
                { value: 1000, name: '华北' },
                { value: 600, name: '东北' },
            ]
        }
    ]
};

