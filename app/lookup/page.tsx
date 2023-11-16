'use client'

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Card from '../components/Card';
import styles from '../styles/LookupPage.module.css';

const LookupPage: React.FC = () => {
  const searchParams = useSearchParams();
  const param = searchParams?.get('type')
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]); // State to store the response data

  useEffect(() => {
    // Define the function to fetch data
    const fetchData = async () => {
      try {
        setIsLoaded(false);
        const response = await fetch('https://lookup.sb3.olive-team.com/get', {
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
        setIsLoaded(true);
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
      <div className={styles.cardContainer}>
        <Card title={"New Service"} initialData={{}} />
        {data.length ?
          data.map((entry, index) => {
            const data = JSON.parse(entry)
            return <Card key={data.id} title={data.name} initialData={data} />
          })
          : (
            <p>{isLoaded ? "No entries available" : "Loading..."}</p>
          )}

      </div>
    </div>
  );
};

export default LookupPage;