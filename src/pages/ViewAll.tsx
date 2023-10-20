import React, { useState, useEffect } from 'react';
import DataTable from '../components/dataTable';
import { useQuery } from 'react-query';
import { Spin } from 'antd';

const ViewAll: React.FC = () => {
  const fetchUserData = async (): Promise<any[]> => {
    try {
      const response = await fetch('https://652cc3a0d0d1df5273efa6e4.mockapi.io/charity');
      const data = await response.json();
      setUserData(data)
      return data
    } catch (error) {
      throw new Error('Error fetching user data');
    }
  };

  const { data, error, isLoading=true } = useQuery({ queryKey: ['users'], queryFn: fetchUserData });

  const [userData, setUserData] = useState<any[]>([]);

  if (isLoading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Spin size="large" /></div>;
  if (error) return <div>An error occurred: {JSON.stringify(error)}</div>;




  return (
    <>
    <div style={{height: "100vh"}}>
      {userData.length >2 && !isLoading?
        <DataTable data1={userData} />:
        (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Spin size="large" /></div>)}
        </div>
    </>
  );
};

export default ViewAll;
