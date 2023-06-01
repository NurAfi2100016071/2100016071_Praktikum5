import React, { useState } from 'react';
import axios from 'axios';


function Testimoni() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState('');
  
    const handleFileSelect = (event) => {
      if (event.target.files.length > 0) {
        setSelectedFile(event.target.files[0]);
      }
    };
  
    const handleFileUpload = async () => {
      if (!selectedFile) {
        setMessage('File Terupload');
        return;
      }
  
      try {
        const formData = new FormData();
        formData.append('image', selectedFile);
  
        const response = await axios.post('http://localhost:3001/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        setMessage(response.data.message);
        console.log("File Berhasil Di Upload")
        setSelectedFile(null);
      } catch (error) {
        setMessage('File gagal diupload');
        console.error(error);
      }
    };
  
    return (
      <div>
        <input type="file" onChange={handleFileSelect} />
        <button onClick={handleFileUpload}>Upload</button>
        {message && <p>{message}</p>}
      </div>
    );
  }

export default Testimoni;
