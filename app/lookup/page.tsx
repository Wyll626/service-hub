'use client'

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Card from '../components/Card';
import styles from '../styles/LookupPage.module.css';

const LookupPage: React.FC = () => {
  const searchParams = useSearchParams();
  const param = searchParams.get('type')
  const [data, setData] = useState(null); // State to store the response data

  useEffect(() => {
    // Define the function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch('https://lookup.olive-team.com/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ type: param }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        setData(result); // Set the response data to state
      } catch (error) {
        console.error('Fetching error:', error);
      }
    };

    fetchData(); // Execute the fetch function
  }, [param]); // Empty dependency array to run only once on component mount

  // Render the fetched data or a loading state
  return (
    <div>
      <h1>Lookup Page</h1>
      <div className={styles.cardContainer}>
        {data ?
          data.map((entry, index) => {
            const data = JSON.parse(entry)
            return <Card key={index} title={data.name} data={data} />
          })
          : (
            <p>Loading...</p>
          )}
      </div>
    </div>
  );
};

export default LookupPage;