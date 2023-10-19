import React,{useEffect,useState} from 'react';
import { Modal, Avatar, Image } from 'antd';
import './styles.css'

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    selectedData: any;
}


const DataViewModal: React.FC<ModalProps> = ({ visible, onClose, selectedData }) => {

    const ProfileImage = ({ source }: { source: string }) => {
        const timestamp = Date.now();
        const imageUrl = `${source}?${timestamp}`;
        return (
            <Image src={imageUrl} style={{ paddingBottom: 0 }} />
        );
    };

    const [width, setWidth] = useState<number>(window.innerWidth);

function handleWindowSizeChange() {
    setWidth(window.innerWidth);
}
useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
    }
}, []);

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            onOk={onClose}
            footer={null}
            width={width*0.9}
                        style={{ overflow: 'clip' }}
        >
            {selectedData &&
                <div style={{ height: '100%', width: '100%' }}>
                    <h3 style={{ backgroundColor: '#002c8c', borderRadius: 15, color: 'whitesmoke', paddingLeft: 10 }}>
                        Charity Information
                    </h3>
                    <div>
                        <Avatar size={80} icon={<ProfileImage source={selectedData.avatar} />} />
                    </div>

                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                        padding: 20, borderWidth: 5, borderColor: '#1111', paddingTop: 20, paddingBottom: 20
                    }}>
                        <div className='outer-div' >
                            Name
                            <div style={{ fontWeight: '450' }}>
                                {selectedData.username}
                            </div>
                        </div>

                        <div className='outer-div'>
                            Location

                            <div style={{ fontWeight: '450' }}>
                                {selectedData.city}, {selectedData.country}
                            </div>
                        </div>

                        <div className='outer-div'>
                            Phone Number

                            <div style={{ fontWeight: '450' }}>
                                {selectedData.phonenumber}
                            </div>
                        </div>

                        <div className='outer-div'>
                            Email

                            <div style={{ fontWeight: '450' }}>
                                {selectedData.email}
                            </div>
                        </div>

                        <div className='outer-div'>
                            Category

                            <div style={{ fontWeight: '450' }}>
                                {selectedData.category}
                            </div>
                        </div>


                        <div className='outer-div'>
                            Website

                            <div style={{ fontWeight: '450' }}>
                                <a href={selectedData.category}>
                                    {selectedData.category}
                                </a>
                            </div>
                        </div>


                        <div className='outer-div'>
                            <div style={{ width: '100%' }}>
                                Donation Link
                            </div>

                            <div style={{ fontWeight: '450' }}>
                                <a href={selectedData.category}>
                                    {selectedData.donationlink}
                                </a>
                            </div>
                        </div>


                        <div className='outer-div'>
                            Intro
                            <div style={{ width: '100%', fontWeight: '450', borderWidth: '5px', borderStyle: 'double', borderColor: '#002c8c', padding: 10 }}>
                                {selectedData.intro}
                            </div>

                        </div>

                    </div>



                </div>}
        </Modal>
    );
};


export default DataViewModal;