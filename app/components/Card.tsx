import React, { useState } from 'react';
import AceEditor from 'react-ace';
import styles from '../styles/Card.module.css';

// Import necessary modes and themes for Ace Editor
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

const Card: React.FC<{ 
  title: string;
  initialData: any;
  onSubmit?: (newData: any) => void;
  onDelete?: (newData: any) => void;
}> = ({ 
  title, 
  initialData, 
  onSubmit = (_newData: any) => { },
  onDelete = (_newData: any) => { }
}) => {
  const [editorData, setEditorData] = useState(JSON.stringify(initialData, null, 2));
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [errorDialog, setErrorDialog] = useState<string | null>(null);

  const handleDataChange = (newValue: string) => {
    setEditorData(newValue);
  };

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(editorData);
      onSubmit(parsedData);

      await fetch("https://lookup.sb3.olive-team.com/add", {
        method: 'POST',
        body: editorData
      });

      location.reload();
    } catch (error) {
      console.error('Invalid JSON:', error);
      // Set the error message for the dialog
      setErrorDialog(error.message);
    }
  };

  const handleDelete = () => {
    // Show delete confirmation modal
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      const parsedData = JSON.parse(editorData);
      onDelete(parsedData);

      await fetch("https://lookup.sb3.olive-team.com/delete", {
        method: 'POST',
        body: JSON.stringify({id: parsedData.id}) // Adjust the API endpoint and payload as needed for deletion
      });

      location.reload();
    } catch (error) {
      console.error('Error deleting:', error);
      // Handle delete error (e.g., show an alert to the user)
    } finally {
      // Close the confirmation modal
      setShowDeleteConfirmation(false);
    }
  };

  const cancelDelete = () => {
    // Close the confirmation modal without deleting
    setShowDeleteConfirmation(false);
  };

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <AceEditor
        mode="json"
        value={editorData}
        onChange={handleDataChange}
        name={`ace-editor-${title}`}
        editorProps={{ $blockScrolling: true }}
        setOptions={{ useWorker: false }}
        className={styles.aceEditorCustom}
      />
      <div className={styles.buttonContainer}>
        <button onClick={handleDelete} className={styles.deleteButton}>Delete</button>
        <button onClick={handleSubmit} className={styles.submitButton}>Submit</button>
      </div>

      {showDeleteConfirmation && (
        <div className={styles.deleteConfirmation}>
          <p>Are you sure you want to delete this card?</p>
          <button onClick={confirmDelete} className={styles.confirmDeleteButton}>Yes</button>
          <button onClick={cancelDelete} className={styles.cancelDeleteButton}>No</button>
        </div>
      )}

      {errorDialog && (
        <div className={styles.deleteConfirmation}>
          <p>{errorDialog}</p>
          <button onClick={() => setErrorDialog(null)} className={styles.submitButton}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Card;
