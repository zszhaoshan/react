import React, { Component } from 'react';

export default class Brand extends Component {

    // 操作
    constructor() {
        super();
        this.state = {
            brandList: [
                {
                    id: 3,
                    name: '水果',
                    time: new Date()
                },
                {
                    id: 2,
                    name: '辣条',
                    time: new Date()
                },
                {
                    id: 1,
                    name: '蛋糕',
                    time: new Date()
                }
            ],
            current: {}

        }
    }

    // 添加：回车
    submit(e) {
        let name = e.target.value;
        // 判断抬起键盘为回车时操作
        if (e.keyCode === 13) {
            // console.log(e);
            if (e.target.value === '') {
                alert('请输入品牌名称！！');
                return;
            };
            // 判断current中是否有id值，如果 有--> 修改  没有--> 添加
            if (this.state.current.id) {
                // 修改
                this.update(this.state.current, name);
            } else {
                // 添加
                this.add(name);
            }

            // 清空输入框
            e.target.value = '';
        }
    }
    // 添加
    add(name) {
        const { brandList } = this.state;
        // id
        let id = brandList.length > 0 ? brandList[0].id + 1 : 1;
        let time = new Date();
        let addList = {
            id,
            name,
            time
        }
        // 将新记录添加到表格中
        brandList.unshift(addList);
        // 重新定义bandList状态
        this.setState({ brandList });
    }
    // 编辑
    edit(row) {
        // 将选中的记录的品牌名称显示在输入框中
        document.querySelector('input').value = row.name;  //旧值
        // console.log(input);
        this.setState({ current: row });  //将选中的记录存入current中
    }
    // 更新
    update(row, name) {
        // console.log(111);
        // console.log(row.id);
        // 将选中的记录id在原有列表中遍历，如果有相同的id，则替换name的值，如果没有则返回原来的记录值
        const { brandList } = this.state;
        // let name;
        const newList = brandList.map(item => {
            if (item.id === row.id) {
                return {
                    ...item,
                    name: name
                }
            } else {
                return item;
            }
        })
        // 更新brandList状态
        this.setState({ brandList: newList });
        this.setState({ current: {} });   //清空current中的值
    }

    // 删除
    del(index) {
        // console.log(index);
        this.state.brandList.splice(index, 1);
        this.setState({ brandList: this.state.brandList });
    }

    render() {
        const { brandList } = this.state;
        return (
            <div className="container">
                <h2>品牌管理</h2>
                {/* 输入框 */}
                <div className="well">
                    <input onKeyUp={(e) => { this.submit(e) }} placeholder="请输入品牌名称" type="text" className="form-control" />
                </div>
                {/* 表格 */}
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>品牌名称</th>
                            <th>创建时间</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brandList.length > 0 ? brandList.map((item, index) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.time.toLocaleString()}</td>
                                <td>
                                    <button onClick={() => { this.edit(item) }} className="btn btn-primary">编辑</button>
                                    <button onClick={() => { this.del(index) }} className="btn btn-danger">删除</button>
                                </td>
                            </tr>
                        )) :
                            <tr>
                                <th colSpan="4">暂无数据</th>
                            </tr>}
                    </tbody>

                </table>
            </div>
        )
    }
}
