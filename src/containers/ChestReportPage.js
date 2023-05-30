import '../App.css';
import axios from 'axios';
import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const ChestReportPage = ({setReport, setMedicalRecord}) => {

    const [fileObj, setFileObj] = useState([]);
    const [fileArray, setFileArray] = useState([]);
    const [predictedReport, setPredictedReport] = useState("");
    const [medicalRecordShow, setMedicalRecordShow] = useState("");

    const medicalRecords = [
        "PatientId: Bradycardia_PPM\nName: Sarah Thompson\nAge: 62\nGender: Female\nMedical History\n    Allergies:\n        - null\n    Childhood Illnesses:\n        - Measles\n        - Mumps\n    Surgeries:\n        - Hysterectomy\n    Chronic Conditions:\n        - Bradycardia\n        - Previous Injuries\n    Family History:\n        - Hypertension: Mother, Sister\n        - Diabetes: Father\n        - Heart Disease: Paternal Grandfather\n    Immunizations:\n        - Influenza\n        - Pneumonia\n    Lifestyle:\n        - Exercise: null\n        - Diet: Heart-healthy diet\n    Habits:\n        - Non-smoker\n        - Moderate alcohol consumption\n    Medications:\n        - Long-term: Beta blockers\n        - As-needed: null\n",
        "PatientId: ChatGPT_A\nName: Emily Anderson\nAge: 34\nGender: Female\nMedical History:\n    Allergies:\n        - Penicillin\n    Childhood Illnesses\n        - Chickenpox\n        - Measles\n    Surgeries:\n        - Appendectomy\n    Chronic Conditions:\n        - Asthma\n    Previous Injuries:\n        - Fractured Wrist\n    Family History\n        - Hypertension: Father\n        - Diabetes: Maternal Grandmother\n    Immunizations:\n        - Influenza\n        - Tetanus\n        - Diphtheria\n        - Pertussis\n        - MMR\n    Lifestyle:\n        - Exercise: Jogging, Yoga\n        - Diet: Balanced diet\n    Medications\n        - Long-term: null\n        - As-needed: null\n        - Antihistamines: null\n",
        "PatientId: CXR3878_IM_1968\nName: Daniel Johnson\nAge: 47\nGender: Male\nMedical History:\n    Allergies:\n        - null\n    Childhood Illnesses:\n        - null\n    Surgeries:\n        - null\n    Chronic Conditions:\n        - Degenerative Disc Disease\n    Previous Injuries:\n        - Fractured Ankle\n    Family History:\n        - Hypertension: Father\n        - Rheumatoid Arthritis: Paternal Aunt\n    Immunizations:\n        - Influenza\n        - Tetanus\n        - Diphtheria\n        - Pertussis\n        - Pneumonia\n    Lifestyle:\n        - Exercise: Cardio workouts, Weight training\n        - Diet: Well-balanced diet\n        - Habits: Non-smoker, Moderate alcohol consumption\n    Medications:\n        - Long-term: null\n        - As-needed: Over-the-counter pain relievers (NSAIDs)\n"
    ];

    function buildFileArray() {
        var tmp_array = [];
        for (let i = 0; i < fileObj[0].length; i++) {
            tmp_array.push(URL.createObjectURL(fileObj[0][i]))
        }
        setFileArray(tmp_array)
    }

    const uploadMultipleFiles = (e) => {
        setFileObj([e.target.files])
    }

    useEffect(() => {
        if (fileObj.length == 0) return;
        buildFileArray()
    }, [fileObj])

    useEffect(() => {
        // var jsonString = JSON.stringify(medicalRecords[0], null, 2);
        setMedicalRecord(medicalRecords[0]);
        setMedicalRecordShow(medicalRecords[0]);
    }, [])
    
    const uploadFiles = (e) => {
        e.preventDefault()
        //console.log(fileArray)
        const formData = new FormData()
        formData.append('file1', fileObj[0][0], 'img1.jpg')
        formData.append('file2', fileObj[0][1], 'img2.jpg')
        var t0 = performance.now();
        axios.post('http://localhost:5000/upload', formData)
        .then(function(response, predicted_report) {
            predicted_report = response.data
            setPredictedReport(predicted_report)
            setReport(predicted_report)
            var t1 = performance.now();
            console.log("The time it took to predict the image " + (t1 - t0) + " milliseconds.")
        })
    }

    const goToChat = (e) => {
        
    }

    const handleMedicalRecordChange = (e) => {
        setMedicalRecord(medicalRecords[e.target.value]);
        setMedicalRecordShow(medicalRecords[e.target.value]);
    }

    //useEffect(() => {
    //    if (fileArray.length == 0) return;
    //    console.log(fileArray)
    //    alert(fileArray.length)
    //}, [fileArray])

    return (
        <div className="App">
          <header className="App-header">
            <div className="App-upload">
              <p>
                Upload images for report generation
              </p>
            </div>
            <div className="form-group multi-preview">
                {(fileArray || []).map(url => (
                    <img src={url} alt="..." />
                ))}
            </div>
            <div className="form-group">
                <input type="file" className="form-control" onChange={uploadMultipleFiles} multiple />
            </div>
            <button type="button" className="btn btn-danger btn-block" onClick={uploadFiles}>Upload</button>
            <div className="medical-records">
                <select name="medical-records-options" id="medical-record-options" onChange={handleMedicalRecordChange} >
                  <option value={0}>Patient 1</option>
                  <option value={1}>Patient 2</option>
                  <option value={2}>Patient 3</option>  
                </select>
            </div>
            <div>
                <p>
                    Medical Record
                </p>
                <textarea cols={50} rows={30} style={{"fontSize": 16, "textAlign": "left"}} defaultValue={medicalRecordShow} readOnly>
                    
                </textarea>
            </div>
          </header>
        </div>
      );
}

export default ChestReportPage;
