import React from 'react';
import AceEditor from 'react-ace';
import styles from '../styles/Card.module.css';

// Import necessary modes and themes for Ace Editor
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

const Card: React.FC<{ title: string; data: any; onDataChange: (newData: any) => void }> = ({ title, data, onDataChange }) => {
  const handleDataChange = (newValue: string) => {
    try {
      const parsedData = JSON.parse(newValue);
      onDataChange(parsedData);
    } catch (error) {
      console.error('Invalid JSON:', error);
    }
  };

  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <AceEditor
        mode="json"
        theme="monokai"
        value={JSON.stringify(data, null, 2)}
        onChange={handleDataChange}
        name={`ace-editor-${title}`} // Unique ID for the editor
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          useWorker: false // Disable syntax checking
        }}
      />
    </div>
  );
};

export default Card;
