import React, { useState, useEffect } from 'react';
import DataTable from '../components/dataTable';

const ViewAll: React.FC = () => {
  const [data1, set_data1] = useState<any[]>([]); // Assuming 'any[]' for simplicity, replace with actual type

  const fetchData = async () => {
    const url = new URL('https://652cc3a0d0d1df5273efa6e4.mockapi.io/charity/');
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
      });
      if (response.ok) {
        const tasks = await response.json();
        set_data1(tasks);
      } else {
        throw new Error('Error fetching data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data1.length > 0 ? (
        <DataTable data1={data1} />
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
};

export default ViewAll;
