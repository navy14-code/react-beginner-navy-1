import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { fetchAllBookAPI } from '../../services/api.service'
import { render } from 'nprogress';
import BookDetail from './book.detail';
import CreateBookControl from './create.book.control';
const BookTable = () => {
    const [dataBooks, setDataBooks] = useState([]);

    const [current, setCurrent] = useState(1);

    const [pageSize, setPageSize] = useState(10);

    const [total, setTotal] = useState(0);

    const [dataDetail, setDataDetail] = useState(null);

    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const [dataUpdate, setDataUpdate] = useState(null);

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);



    useEffect(() => {
        loadBook();
    }, [current, pageSize])


    const loadBook = async () => {
        const res = await fetchAllBookAPI(current, pageSize)
        if (res.data) {
            setDataBooks(res.data.result);
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
    }

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current) {
            if (pagination.current !== +current) {
                setCurrent(+pagination.current) // '+' ep kieu string =>> int
            }
        }
        // thay doi tong so phan tu : pagesize
        if (pagination && pagination.pageSize) {
            if (pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize) // '+' ep kieu string =>> int
            }
        }
    }

    const handleDeleteUser = () => {

    }


    const columns = [
        {
            title: 'STT',
            dataIndex: '_id',
            key: 'id',
            render: (_, record, index) => {

                return (
                    <>{(index + 1) + (current - 1) * pageSize}</>
                )
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <a
                        href='#'
                        onClick={() => {
                            setDataDetail(record);
                            setIsDetailOpen(true);
                        }}>
                        {record._id} </a>
                )
            }
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            render: (text, record, index, action) => {
                if (text)
                    return new Intl.NumberFormat(`vi-VN`, { style: "currency", currency: 'VND' }).format(text)
            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
        },
        {
            title: 'Tác Giả',
            dataIndex: 'author',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: '20px' }}>
                    <EditOutlined
                        onClick={() => {
                            setDataUpdate(record);
                            setIsModalUpdateOpen(true);
                        }}
                        style={{ cursor: 'pointer', color: 'orange' }}
                    />
                    <Popconfirm
                        title="Delete book"
                        description="Are you sure to delete nook ?"
                        icon={<QuestionCircleOutlined style={{ color: 'red', }} />}
                        onConfirm={() => { handleDeleteUser(record._id) }}
                        onOpenChange={() => { }}
                        okText="Yes"
                        cancelText="No"
                        placement='topLeft'
                    >
                        <DeleteOutlined style={{ cursor: 'pointer', color: 'red' }} />
                    </Popconfirm>

                </div>
            ),
        },
    ];
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                <h3>Table Books</h3>
                <Button type='primary'
                    onClick={() => { setIsCreateOpen(true) }}> Create  </Button>
            </div>
            <Table
                columns={columns}
                dataSource={dataBooks}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }
                }
                onChange={onChange}
            />
            <BookDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
            />
            <CreateBookControl
                isCreateOpen={isCreateOpen}
                setIsCreateOpen={setIsCreateOpen}
                loadBook={loadBook}
            />
        </>
    )
}
export default BookTable;