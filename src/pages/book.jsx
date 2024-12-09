import { Header } from "antd/es/layout/layout";
import BookTable from "../components/book/book.table";
import { useEffect, useState } from "react";
import { fetchAllBookAPI } from "../services/api.service";

const BookPage = () => {
    return (
        <div style={{ padding: '20px' }}>
            <BookTable />
        </div>
    );

}
export default BookPage