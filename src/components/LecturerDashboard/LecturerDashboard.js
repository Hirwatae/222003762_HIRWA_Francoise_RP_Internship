// LecturerDashboard.js
import React, { useState, useEffect } from 'react';
// Assuming you have Font Awesome linked in public/index.html
// If you want to use react-icons, uncomment and install:
// import { FaEye, FaBook, FaPlusSquare, FaEdit, FaClipboardList, FaChartLine, FaSignOutAlt, FaFileUpload, FaFolderPlus, FaBookOpen } from 'react-icons/fa';

import './LecturerDashboard.css'; // Import your CSS file

const LecturerDashboard = () => {
    const [activeSection, setActiveSection] = useState('overview'); // Default to overview
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({
        title: '',
        code: '',
        description: '',
        file: null, // For file upload associated with the course (File object)
        fileName: '', // To store just the file name string
    });
    const [editingCourseId, setEditingCourseId] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    // Effect to clear messages after a delay
    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => {
                setMessage({ type: '', text: '' });
            }, 3000); // Clear message after 3 seconds
            return () => clearTimeout(timer);
        }
    }, [message]);

    // --- Mock API Calls (Replace with actual API calls in a real app) ---
    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        setLoading(true);
        // Clear message before new fetch
        setMessage({ type: '', text: '' });
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 500));
            const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
            setCourses(storedCourses);
            // Only show success message if courses were actually loaded (or if it's the initial load)
            if (storedCourses.length > 0 || message.type === '') { // Avoid showing success if already an error or empty init
                setMessage({ type: 'success', text: 'Courses loaded successfully!' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to load courses.' });
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const addCourse = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        // Basic validation
        if (!newCourse.title || !newCourse.code || !newCourse.description) {
            setMessage({ type: 'error', text: 'Please fill all module fields.' });
            setLoading(false);
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            const courseToAdd = {
                ...newCourse,
                id: Date.now(),
                fileName: newCourse.file ? newCourse.file.name : 'No file',
            };
            const updatedCourses = [...courses, courseToAdd];
            setCourses(updatedCourses);
            localStorage.setItem('courses', JSON.stringify(updatedCourses));
            setNewCourse({ title: '', code: '', description: '', file: null, fileName: '' }); // Reset form
            setMessage({ type: 'success', text: `Module "${courseToAdd.title}" added successfully!` });
            setActiveSection('courses'); // Optionally redirect to 'My Modules' after adding
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to add module.' });
            console.error('Error adding course:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateCourse = async (id, updatedData) => {
        setLoading(true);
        setMessage({ type: '', text: '' });
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const updatedCourses = courses.map(course =>
                course.id === id ? { ...course, ...updatedData } : course
            );
            setCourses(updatedCourses);
            localStorage.setItem('courses', JSON.stringify(updatedCourses));
            setEditingCourseId(null); // Exit editing mode
            setMessage({ type: 'success', text: `Module "${updatedData.title}" updated successfully!` });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update module.' });
            console.error('Error updating course:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteCourse = async (id) => {
        setLoading(true);
        setMessage({ type: '', text: '' });
        if (!window.confirm('Are you sure you want to delete this module?')) {
            setLoading(false);
            return;
        }
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const updatedCourses = courses.filter(course => course.id !== id);
            setCourses(updatedCourses);
            localStorage.setItem('courses', JSON.stringify(updatedCourses));
            setMessage({ type: 'success', text: 'Module deleted successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to delete module.' });
            console.error('Error deleting course:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewCourse({ ...newCourse, file: file, fileName: file ? file.name : '' });
    };

    const handleLogout = () => {
        // In a real app, you'd invalidate tokens/sessions here
        console.log('Logging out...');
        localStorage.removeItem('userToken'); // Example
        // Redirect to login page or home page
        window.location.href = '/login'; // Or navigate using react-router-dom: navigate('/login');
    };

    // Helper component for Course Row
    const CourseRow = ({ course, onEdit, onDelete, isEditing, onSave, onCancel }) => {
        const [editableCourse, setEditableCourse] = useState(course);

        const handleChange = (e) => {
            setEditableCourse({ ...editableCourse, [e.target.name]: e.target.value });
        };

        const handleFileChangeInEdit = (e) => {
            const file = e.target.files[0];
            setEditableCourse({
                ...editableCourse,
                file: file, // Store the file object if needed for upload
                fileName: file ? file.name : 'No file', // Update the display name
            });
        };

        return (
            <tr>
                <td>{isEditing ? <input type="text" name="title" value={editableCourse.title} onChange={handleChange} className="table-input" /> : course.title}</td>
                <td>{isEditing ? <input type="text" name="code" value={editableCourse.code} onChange={handleChange} className="table-input" /> : course.code}</td>
                <td>{isEditing ? <textarea name="description" value={editableCourse.description} onChange={handleChange} className="table-textarea"></textarea> : course.description}</td>
                <td>
                    {isEditing ? (
                        <div className="file-upload-table-cell">
                            <input
                                type="file"
                                id={`file-upload-${course.id}`}
                                className="file-upload-input"
                                onChange={handleFileChangeInEdit}
                            />
                            <label htmlFor={`file-upload-${course.id}`} className="file-upload-label-small">
                                Choose File
                            </label>
                            <span className="file-name-display">{editableCourse.fileName || 'No file chosen'}</span>
                        </div>
                    ) : (
                        course.fileName && course.fileName !== 'No file' ? course.fileName : 'N/A'
                    )}
                </td>
                <td className="actions-cell">
                    {isEditing ? (
                        <>
                            <button className="save-button" onClick={() => onSave(course.id, editableCourse)} disabled={loading}>Save</button>
                            <button className="cancel-button" onClick={onCancel} disabled={loading}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <button className="edit-button" onClick={() => onEdit(course.id)} disabled={loading}>Edit</button>
                            <button className="delete-button" onClick={() => onDelete(course.id)} disabled={loading}>Delete</button>
                        </>
                    )}
                </td>
            </tr>
        );
    };

    return (
        <div className="lecturer-dashboard-layout">
            {/* Sidebar */}
            <div className="sidebar">
                <nav>
                    <ul>
                        <li>
                            <button
                                className={`sidebar-link ${activeSection === 'overview' ? 'active' : ''}`}
                                onClick={() => { setActiveSection('overview'); setMessage({ type: '', text: '' }); }}
                            >
                                <i className="fas fa-eye icon"></i> {/* Overview Icon */}
                                Overview
                            </button>
                        </li>
                        <li>
                            <button
                                className={`sidebar-link ${activeSection === 'courses' ? 'active' : ''}`}
                                onClick={() => { setActiveSection('courses'); setMessage({ type: '', text: '' }); }}
                            >
                                <i className="fas fa-book-open icon"></i> {/* My Modules Icon */}
                                My Modules
                            </button>
                        </li>
                        <li>
                            <button
                                className={`sidebar-link ${activeSection === 'add-course' ? 'active' : ''}`}
                                onClick={() => {
                                    setActiveSection('add-course');
                                    setNewCourse({ title: '', code: '', description: '', file: null, fileName: '' }); // Reset form on add new
                                    setEditingCourseId(null); // Ensure not in editing mode
                                    setMessage({ type: '', text: '' }); // Clear messages
                                }}
                            >
                                <i className="fas fa-folder-plus icon"></i> {/* Add Module Icon */}
                                Add New Module
                            </button>
                        </li>
                        <li>
                            <button
                                className={`sidebar-link ${activeSection === 'module-editor' ? 'active' : ''}`}
                                onClick={() => { setActiveSection('module-editor'); setMessage({ type: '', text: '' }); }}
                            >
                                <i className="fas fa-edit icon"></i> {/* Module Editor Icon */}
                                Module Editor
                            </button>
                        </li>
                        <li>
                            <button
                                className={`sidebar-link ${activeSection === 'assessment-builder' ? 'active' : ''}`}
                                onClick={() => { setActiveSection('assessment-builder'); setMessage({ type: '', text: '' }); }}
                            >
                                <i className="fas fa-clipboard-list icon"></i> {/* Assessment Builder Icon */}
                                Assessment Builder
                            </button>
                        </li>
                        <li>
                            <button
                                className={`sidebar-link ${activeSection === 'learner-progress' ? 'active' : ''}`}
                                onClick={() => { setActiveSection('learner-progress'); setMessage({ type: '', text: '' }); }}
                            >
                                <i className="fas fa-chart-line icon"></i> {/* Learner Progress Icon */}
                                Learner Progress
                            </button>
                        </li>
                    </ul>
                </nav>
                <button className="logout-button" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt icon"></i>
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div className="dashboard-main-content">
                <header className="dashboard-header">
                    <h1>Lecturer Dashboard</h1>
                </header>

                <main className="dashboard-content">
                    {loading && <div className="loading-message">Loading data...</div>}
                    {message.text && <div className={`message ${message.type}`}>{message.text}</div>}

                    {activeSection === 'overview' && (
                        <section className="dashboard-section full-width-section">
                            <h2><i className="fas fa-chart-line"></i> Dashboard Overview</h2>
                            <h3>A quick glance at your activities.</h3>
                            <div className="overview-grid">
                                <div className="overview-card">
                                    <h4>Total Modules</h4>
                                    <p className="overview-value">{courses.length}</p>
                                    <p className="overview-description">Number of modules you manage.</p>
                                </div>
                                <div className="overview-card">
                                    <h4>Files Uploaded</h4>
                                    <p className="overview-value">{courses.filter(c => c.fileName && c.fileName !== 'No file').length}</p>
                                    <p className="overview-description">Modules with associated files.</p>
                                </div>
                                <div className="overview-card">
                                    <h4>Recent Activity</h4>
                                    <ul className="recent-activity-list">
                                        {courses.length > 0 ? (
                                            // Sort courses by ID (most recent first for mock data)
                                            courses.slice().sort((a, b) => b.id - a.id).slice(0, 3).map(course => (
                                                <li key={course.id}>
                                                    Updated/Added: <strong>{course.title}</strong>
                                                </li>
                                            ))
                                        ) : (
                                            <li>No recent activity.</li>
                                        )}
                                    </ul>
                                </div>
                                {/* Add more overview cards as needed */}
                            </div>
                            <div className="placeholder-content">
                                <p>This overview page will show summaries of your modules, recent activities, learner engagement, and more. Data visualization components can be integrated here.</p>
                                <p>It provides a centralized view of your progress and interaction within the system.</p>
                            </div>
                        </section>
                    )}

                    {activeSection === 'courses' && (
                        <section className="dashboard-section full-width-section">
                            <h2><i className="fas fa-book-open"></i> My Modules</h2>
                            <h3>Manage your existing modules and their materials.</h3>

                            <div className="data-table-container">
                                {loading ? (
                                    <p className="loading-message">Loading modules...</p>
                                ) : courses.length === 0 ? (
                                    <p className="placeholder-content">No modules added yet. Go to "Add New Module" to create one.</p>
                                ) : (
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>Module Title</th>
                                                <th>Module Code</th>
                                                <th>Description</th>
                                                <th>Attached File</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {courses.map(course => (
                                                <CourseRow
                                                    key={course.id}
                                                    course={course}
                                                    onEdit={() => setEditingCourseId(course.id)}
                                                    onDelete={deleteCourse}
                                                    isEditing={editingCourseId === course.id}
                                                    onSave={updateCourse}
                                                    onCancel={() => setEditingCourseId(null)}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </section>
                    )}

                    {activeSection === 'add-course' && (
                        <section className="dashboard-section full-width-section">
                            <h2><i className="fas fa-folder-plus"></i> Add New Module</h2>
                            <h3>Fill in the details to create a new module for your learners.</h3>

                            <form className="course-form" onSubmit={addCourse}>
                                <div className="form-group">
                                    <label htmlFor="courseTitle">Module Title:</label>
                                    <input
                                        type="text"
                                        id="courseTitle"
                                        className="form-input"
                                        value={newCourse.title}
                                        onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                                        placeholder="e.g., Introduction to Computer Science"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="courseCode">Module Code:</label>
                                    <input
                                        type="text"
                                        id="courseCode"
                                        className="form-input"
                                        value={newCourse.code}
                                        onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                                        placeholder="e.g., CS101"
                                        required
                                    />
                                </div>
                                <div className="form-group full-width-field">
                                    <label htmlFor="courseDescription">Module Description:</label>
                                    <textarea
                                        id="courseDescription"
                                        className="form-textarea"
                                        value={newCourse.description}
                                        onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                                        placeholder="Provide a brief overview of the module content, objectives, etc."
                                        rows="5"
                                        required
                                    ></textarea>
                                </div>

                                <div className="form-group full-width-field">
                                    <label htmlFor="courseFile">Upload Module Material (Optional):</label>
                                    <div className="file-upload-container">
                                        <input
                                            type="file"
                                            id="courseFile"
                                            className="file-upload-input"
                                            onChange={handleFileChange}
                                        />
                                        <label htmlFor="courseFile" className="file-upload-label">
                                            <i className="fas fa-file-upload icon"></i> Choose File
                                        </label>
                                        <span className="file-upload-info">
                                            {newCourse.fileName || 'No file chosen (PDF, DOCX, PPT, etc.)'}
                                        </span>
                                        {newCourse.file && (
                                            <button
                                                type="button"
                                                onClick={() => setNewCourse({ ...newCourse, file: null, fileName: '' })}
                                                className="cancel-button"
                                                style={{ marginTop: '5px', alignSelf: 'flex-start' }}
                                            >
                                                Clear File
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <button type="submit" className="add-course-button" disabled={loading}>
                                    {loading ? 'Adding Module...' : 'Add Module'}
                                </button>
                            </form>
                        </section>
                    )}

                    {/* New Section: Module Editor */}
                    {activeSection === 'module-editor' && (
                        <section className="dashboard-section full-width-section">
                            <h2><i className="fas fa-edit"></i> Module Editor</h2>
                            <h3>Structure your modules, add lessons, topics, and learning activities.</h3>
                            <div className="placeholder-content">
                                <p>This section will allow you to delve into a specific module and build its internal structure.</p>
                                <ul>
                                    <li>Create and organize **lessons** and **topics**.</li>
                                    <li>Add **text content**, **videos**, **links**, and other learning materials.</li>
                                    <li>Set **sequential learning paths** or prerequisites.</li>
                                    <li>Drag-and-drop interfaces could be implemented here for intuitive module design.</li>
                                </ul>
                                <p>*(Future Development: Link this to specific modules from "My Modules" to edit their internal content.)*</p>
                            </div>
                        </section>
                    )}

                    {/* New Section: Assessment Builder */}
                    {activeSection === 'assessment-builder' && (
                        <section className="dashboard-section full-width-section">
                            <h2><i className="fas fa-clipboard-list"></i> Assessment Builder</h2>
                            <h3>Create and manage quizzes, assignments, and exams for your modules.</h3>
                            <div className="placeholder-content">
                                <p>Here, you'll be able to:</p>
                                <ul>
                                    <li>Design various **assessment types** (e.g., multiple-choice, true/false, short answer, essay).</li>
                                    <li>Set **question banks** and randomize questions.</li>
                                    <li>Configure **grading rubrics**, **time limits**, and **submission settings**.</li>
                                    <li>Assign assessments to specific modules and lessons.</li>
                                </ul>
                                <p>*(Future Development: Link assessments to modules and integrate with learner progress tracking.)*</p>
                            </div>
                        </section>
                    )}

                    {/* New Section: Learner Progress */}
                    {activeSection === 'learner-progress' && (
                        <section className="dashboard-section full-width-section">
                            <h2><i className="fas fa-chart-line"></i> Learner Progress</h2>
                            <h3>Monitor your learners' performance and engagement across all modules.</h3>
                            <div className="placeholder-content">
                                <p>This section will provide insights into:</p>
                                <ul>
                                    <li>**Individual learner performance** on assignments and quizzes.</li>
                                    <li>**Module completion rates**.</li>
                                    <li>**Engagement metrics** (e.g., time spent on content).</li>
                                    <li>Generate **reports** and identify learners who might need additional support.</li>
                                </ul>
                                <p>*(Future Development: Implement charts, graphs, and detailed drill-down views for each learner and module.)*</p>
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

export default LecturerDashboard;