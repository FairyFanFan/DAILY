// 简易扁平化
let arr = [
    {
        "id": 1,
        "name": "部门1",
        "pid": 0,
        "children": [
            {
                "id": 2,
                "name": "部门2",
                "pid": 1,
                "children": [
                    {
                        "id": 21,
                        "name": "部门21",
                        "pid": 1,
                    }
                ]
            },
            {
                "id": 3,
                "name": "部门3",
                "pid": 1,
                "children": [
                    {
                        "id": 31,
                        "name": "部门31",
                        "pid": 1,
                    }
                ]
            }
        ]
    },
    {
        "id": 100,
        "name": "部门100",
        "pid": 0,
        "children": [
            {
                "id": 102,
                "name": "部门102",
                "pid": 102,
                "children": [
                    {
                        "id": 103,
                        "name": "部门103",
                        "pid": 103,
                    }
                ]
            },
            {
                "id": 104,
                "name": "部门104",
                "pid": 104,
                "children": [
                    {
                        "id": 105,
                        "name": "部门105",
                        "pid": 105,
                    }
                ]
            }
        ]
    }
]
// 目标如下
// [
//     {id: 1, name: '部门1', pid: 0},
//     {id: 2, name: '部门2', pid: 1},
//     {id: 3, name: '部门3', pid: 1},
//     {id: 4, name: '部门4', pid: 3},
//     {id: 5, name: '部门5', pid: 4},
// ]
function flat(arr) {
    // let res = [];
    // arr.map(item => {
    //     if(item.children) {
    //         res.push(...flat(item.children)); // 递归时候如何把res之前的值保留下来花了很久时间思考
    //     };
    //     res.push(item); // point: 不论怎么样 都要push进入res
    // })
    // return res;
    return arr.reduce((prev, next) => {
        if (next.children) {
            prev.push(...flat(next.children));
        }
        prev.push(next); // 注意这里易错，外围没有 else{},有next.children时候本身的next也需要push
        return prev; // 这里是思考的关键点，reduce使用的不熟练
    }, [])
}
// // 2层 你只是考虑了两层
// arr.map(item => {
//     res.push(item);
//     if( item.children ) {
//         res = [...res, ...flat(item.children)]
//     }
// })
// console.log(flat(arr));
// console.log(flat(arr).sort((a,b)=>a.id - b.id));

// 勤勉
// 培养三个技巧 写作 交流 读

// -----------------扁平数据改造树----------------------
// https://juejin.cn/post/6983904373508145189
let brr = [
    {id: 1, name: '部门1', pid: 0},
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 4, name: '部门4', pid: 3},
    {id: 5, name: '部门5', pid: 4},
]
let hash = {};
arr.map(item => {
    hash[item.id] = item
});

function tree(arr, res = [], ) {
    arr.map(item => {
        if(!item.pid) {
            item.children = [];
            res.push(item);
        } else {
            tree(item,);
        }
    })
    // arr.sort((a,b) => a.pid - b.pid).map(item => {
    //     if(!item.pid) {
    //         hash[item.pid].children = hash[item.pid].children ? [...hash[item.pid].children, ...item] : [...item]
    //         // item = {...item, ...{children: null}}
    //         res.push(item);
    //     }
    //     item.pid
    // })
    
}
// 目标结果
// [
//     {
//         "id": 1,
//         "name": "部门1",
//         "pid": 0,
//         "children": [
//             {
//                 "id": 2,
//                 "name": "部门2",
//                 "pid": 1,
//                 "children": []
//             },
//             {
//                 "id": 3,
//                 "name": "部门3",
//                 "pid": 1,
//                 "children": [
//                     // 结果 ,,,
//                 ]
//             }
//         ]
//     }
// ]