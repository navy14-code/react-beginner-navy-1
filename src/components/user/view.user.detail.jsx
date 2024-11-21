import { Drawer } from "antd"

const ViewUserDetail = (props) => {

    const {
        dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen
    } = props;

    return (
        <Drawer title="Detail Users"
            onClose={() => {
                setDataDetail(null);
                setIsDetailOpen(false);
            }}
            open={isDetailOpen}
        >
            {dataDetail ?
                <>
                    <p>Id : {dataDetail._id}</p>
                    <br />
                    <p>Full name : {dataDetail.fullName}</p>
                    <br />
                    <p>Email : {dataDetail.email}</p>
                    <br />
                    <p>Phone : {dataDetail.phone}</p>
                    <br />
                </>
                :
                <>
                    <p>Not data</p>
                </>
            }
        </Drawer>
    )
}
export default ViewUserDetail