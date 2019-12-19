import React, { Component } from 'react'
import { 
 Card,
 Select,
 Input,
 Button,
 Icon,
 Table
} from 'antd'
import LinkButton from '../../components/link-button'
import {reqProducts, reqSearchProducts, reqUpdateProductStatus} from '../../api'
import {PAGE_SIZE} from '../../utils/constants'
const Option = Select.Option
export default class ProductHome extends Component {
    state = {
        total: 0, // 商品的总数量
        products: [], // 当前页列表数据
        searchType: 'productName', // 搜索类型 productName / productDesc
        searchName: '', // 搜索关键字
        }

    render() {
        const {products, total, searchType} = this.state
        const title = (
        <span>
            <Select value={searchType} onChange={value => this.setState({searchType:
            value})}>
            <Option key='productName' value='productName'>按名称搜索</Option>
            <Option key='productDesc' value='productDesc'>按描述搜索</Option>
            </Select>
            <Input style={{width: 150, marginLeft: 10, marginRight: 10}} placeholder='
            关键字'
            onChange={(e) => this.setState({searchName: e.target.value})}/>
            <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
        </span>
        ) 
    const extra = (
            <Button type='primary' style={{float: 'right'}} onClick={() =>
            this.props.history.push('/product/addupdate')}>
            <Icon type='plus'/>
            添加商品
            </Button>
        )
        
        return (
            <Card title={title}  extra={extra}>
                <Table
                    bordered
                    rowKey='_id'
                    columns={this.columns}
                    dataSource={products}
                    pagination={{
                        defaultPageSize: PAGE_SIZE,
                        total,
                        showQuickJumper: true,
                        onChange: this.getProducts
                    }}
                />
            </Card>
        )
    }
}
