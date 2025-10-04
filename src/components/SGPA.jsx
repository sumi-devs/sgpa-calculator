import './SGPA.css';
import { useState } from 'react';

function SGPA() {

    const [rollNo, setRollNo] = useState('');
    const [name, setName] = useState('');
    const [subjects, setSubjects] = useState([{ name: "", mark: 0, credit: 0 }]);
    const [sgpa, setSGPA] = useState(null);
    const [SGPACalculated, setSGPACalculated] = useState(false);
    const [average, setAverage] = useState(null);
    const [averageCalculated, setAverageCalculated] = useState(false);
    const [showGradeScale, setShowGradeScale] = useState(false);

    const gradeScale = {
        O: { points: 10, rating: "Outstanding", minMarks: 90 },
        "A+": { points: 9.5, rating: "Excellent", minMarks: 85 },
        A: { points: 9, rating: "Very Good", minMarks: 80 },
        "B+": { points: 8, rating: "Good", minMarks: 75 },
        B: { points: 7, rating: "Above Average", minMarks: 70 },
        C: { points: 6, rating: "Average", minMarks: 60 },
        P: { points: 5, rating: "Pass", minMarks: 50 },
        F: { points: 0, rating: "Fail", minMarks: 0 },
    };

    const getGradeFromMarks = (marks) => {
        if (marks >= 90) return 'O';
        if (marks >= 85) return 'A+';
        if (marks >= 80) return 'A';
        if (marks >= 75) return 'B+';
        if (marks >= 70) return 'B';
        if (marks >= 60) return 'C';
        if (marks >= 50) return 'P';
        return 'F';
    }

    const addSubject = () => {
        setSubjects([...subjects, { name: "", mark: 0, credit: 0 }]);
    }

    const updateSubject = (index, field, value) => {
        const updated = [...subjects];
        updated[index][field] = field === "name" ? value : parseFloat(value) || 0;
        setSubjects(updated);
    }

    const removeSubject = (index) => {
        const updated = subjects.filter((_, i) => i !== index);
        setSubjects(updated);
    }

    const calculate = () => {

        const hasAllCredits = subjects.every(sub => sub.credit > 0);
        if (!hasAllCredits) {
            alert("Please enter valid credits for all subjects.");
            return;
        }

        let totalCreditPoints = 0;
        let totalCredits = 0;

        subjects.forEach((subject) => {
            const grade = getGradeFromMarks(subject.mark);
            const gradePoint = gradeScale[grade].points;
            const creditPoints = gradePoint * subject.credit;

            totalCreditPoints += creditPoints;
            totalCredits += subject.credit;
        });

        const calculatedSGPA = totalCredits > 0 ? (totalCreditPoints / totalCredits) : 0;
        setSGPA(calculatedSGPA.toFixed(2));
        setSGPACalculated(true);
    }

    const calculateAverage = () => {
        let totalMarks = 0;
        subjects.forEach((subject) => {
            totalMarks += subject.mark;
        })

        const calculatedAverage = subjects.length > 0 ? (totalMarks / subjects.length) : 0;
        setAverage(calculatedAverage.toFixed(2));
        setAverageCalculated(true);
    }

    return (
        <div className="sgpa-container">
            <div className="header">
                <h2>SGPA Calculator</h2>
                <p className="subtitle">Calculate your Semester Grade Point Average (SGPA) easily!</p>
                {!showGradeScale && (<button onClick={() => setShowGradeScale(true)}>Grade Scale</button>)}
            </div>

            {showGradeScale && (
                <div className="grade-scale">
                        <div className="scale-header">
                            <h3>Grade Scale</h3>
                            <button onClick={() => setShowGradeScale(false)}>
                                ✕
                            </button>
                        </div>

                        <ul>
                            <li>A+ : 10</li>
                            <li>A : 9</li>
                            <li>B+ : 8</li>
                            <li>B : 7</li>
                            <li>C : 6</li>
                            <li>D : 5</li>
                            <li>F : 0</li>
                        </ul>
                </div>
            )}

            <div className="student-info">
                <div className="info-header">
                    <h3>Student Info</h3>
                </div>
                <div className="input-group">
                    <div className="rollno">
                        <label htmlFor='rollno' className='rollnolabel'>Roll Number</label>
                        <input type='number' value={rollNo} className='rollnobox' placeholder='Roll No' onChange={(e) => setRollNo(e.target.value)}></input>
                    </div>
                    <div className="name">
                        <label htmlFor='name' className='namelabel'>Name</label>
                        <input type='text' value={name} className='namebox' placeholder='Name' onChange={(e) => setName(e.target.value)}></input>
                    </div>
                </div>
            </div>

            <div className="subjects">
                <div className="subject-header">
                    <h3>Subjects</h3>
                    <button className='add' onClick={addSubject}>+ Add</button>
                </div>
                <div className="input-group2">
                    <div className="subject">
                        {subjects.map((subject, index) => (
                            <div className="subjectbox" key={index}>
                                <label htmlFor='subject' className='subjectlabel'>Subject {index + 1}</label>
                                <input type='text' className='subjectnamebox' placeholder='Subject Name' value={subject.name} onChange={(e) => updateSubject(index, "name", e.target.value)}></input>
                                <label htmlFor='mark' className='marklabel'>Mark</label>
                                <input type='number' className='markbox' placeholder='Mark' value={subject.mark} onChange={(e) => updateSubject(index, "mark", e.target.value)}></input>
                                <label htmlFor='credit' className='creditlabel'>Credit</label>
                                <input type='number' className='creditbox' placeholder='Credit' value={subject.credit} onChange={(e) => updateSubject(index, "credit", e.target.value)}></input>

                                {subjects.length > 1 && (
                                    <button onClick={() => removeSubject(index)}>
                                        - Remove
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <button className='calc-button' onClick={calculate}>Calculate</button>
            </div>

            {SGPACalculated && (
                <div className="result">
                    <h3>Your SGPA: {sgpa}</h3>
                    {!averageCalculated && (
                        <button onClick={calculateAverage}>Calculate Average</button>)}
                    {averageCalculated && (
                        <h3>Your Average: {average}</h3>)}
                </div>)
            }

        </div>
    )
}

export default SGPA;