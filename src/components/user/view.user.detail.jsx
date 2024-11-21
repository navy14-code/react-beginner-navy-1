import { Button, Drawer, Upload } from "antd"

const ViewUserDetail = (props) => {

    const {
        dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen
    } = props;

    return (
        <Drawer
            width={`40vw`}
            title="Detail Users"
            onClose={() => {
                setDataDetail(null);
                setIsDetailOpen(false);
            }}
            open={isDetailOpen}
        >
            {dataDetail ?
                <>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: '1', textAlign: 'center' }}>

                            <br />
                            <img
                                height={250}
                                width={250}
                                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} />
                            <div style={{ textAlign: 'center', padding: '20px' }}>
                                <label htmlFor="btnUpload" style={{
                                    cursor: 'pointer',
                                    background: 'gold',
                                    display: 'block',
                                    marginTop: '15px',
                                    padding: '5px 10px',
                                    width: "fit-content",
                                    borderRadius: '5px'
                                }}>
                                    Upload Avatar
                                </label>
                                <input type="file" hidden id="btnUpload" name="myfile"></input>
                            </div>
                            {/* <Button type="primary" style={{ textAlign: 'left', marginTop: '10px' }}>Upload Avatar</Button> */}
                        </div>
                        <div style={{ flex: '2', paddingLeft: '50px' }}>
                            <p>Id : {dataDetail._id}</p>
                            <br />
                            <p>Full name : {dataDetail.fullName}</p>
                            <br />
                            <p>Email : {dataDetail.email}</p>
                            <br />
                            <p>Phone : {dataDetail.phone}</p>
                            <br />
                        </div>
                    </div>

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