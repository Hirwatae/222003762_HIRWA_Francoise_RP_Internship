import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './LecturerDashboard.css'; // Import the updated CSS file

const LecturerDashboard = () => {
    // State to manage which section is currently active for display
    const [activeSection, setActiveSection] = useState('dashboard'); // 'dashboard', 'my-courses', 'course-editor', 'file-upload', 'assessment-builder', 'learner-progress'

    // State to store the list of courses fetched from the backend
    const [courses, setCourses] = useState([]);
    // State for the form to add a new course
    const [newCourse, setNewCourse] = useState({
        title: '',
        description: '',
        credits: '',
        lecturer_id: '',
        pages: ''
    });
    // State to track the ID of the course being edited
    const [editingCourseId, setEditingCourseId] = useState(null);
    // State to hold the data of the course being edited
    const [editingCourse, setEditingCourse] = useState({ ...newCourse });
    // State for displaying success messages to the user
    const [message, setMessage] = useState('');
    // State for displaying error messages to the user
    const [error, setError] = useState('');
    // State to indicate if data is currently being loaded (for courses)
    const [loading, setLoading] = useState(false);

    // State for file upload functionality
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState('');
    const [uploadError, setUploadError] = useState('');

    // Base URL of your backend API
    const backendUrl = 'http://localhost:5000'; // Make sure this matches your Flask backend URL

    // Helper to clear general messages after a delay
    const clearMessages = () => {
        setTimeout(() => {
            setMessage('');
            setError('');
        }, 5000); // Clear messages after 5 seconds
    };

    // Helper to clear upload messages after a delay
    const clearUploadMessages = () => {
        setTimeout(() => {
            setUploadMessage('');
            setUploadError('');
        }, 5000); // Clear messages after 5 seconds
    };

    // useEffect hook to fetch courses when the component mounts or when 'My Courses' is active
    useEffect(() => {
        if (activeSection === 'my-courses') {
            fetchCourses();
        }
    }, [activeSection]); // Re-fetch courses when the activeSection becomes 'my-courses'

    // Function to fetch the list of courses from the backend
    const fetchCourses = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`${backendUrl}/courses`);
            setCourses(response.data);
            setMessage('Courses loaded successfully!');
            clearMessages();
        } catch (err) {
            console.error('Fetch error:', err);
            setError('Failed to fetch courses. Please check your network and backend server.');
            clearMessages();
        } finally {
            setLoading(false);
        }
    };

    // Generic handler for input changes in forms
    const handleInputChange = (e, setter) => {
        const { name, value } = e.target;
        setter(prev => ({ ...prev, [name]: value }));
    };

    // Handler for adding a new course
    const handleAddCourse = async (e) => {
        e.preventDefault();
        clearMessages(); // Clear existing general messages

        // Basic client-side validation for required fields
        if (!newCourse.title || !newCourse.credits || !newCourse.lecturer_id || !newCourse.pages) {
            setError('Please fill in all required fields (Title, Credits, Lecturer ID, Pages).');
            clearMessages();
            return;
        }

        setLoading(true); // Set loading for the operation
        setError('');
        try {
            await axios.post(`${backendUrl}/courses`, newCourse);
            setMessage('Course added successfully!');
            setNewCourse({ title: '', description: '', credits: '', lecturer_id: '', pages: '' }); // Reset the form
            fetchCourses(); // Refresh the course list
            clearMessages();
        } catch (err) {
            console.error('Add error:', err);
            setError('Failed to add course: ' + (err.response?.data?.error || 'Server error.'));
            clearMessages();
        } finally {
            setLoading(false);
        }
    };

    // Handler to set a course for editing
    const handleEditCourse = (course) => {
        setEditingCourseId(course.id);
        setEditingCourse({ ...course }); // Populate the edit form with course data
        clearMessages();
    };

    // Handler for updating an existing course
    const handleUpdateCourse = async (e) => {
        e.preventDefault();
        clearMessages(); // Clear existing general messages

        // Basic client-side validation for required fields
        if (!editingCourse.title || !editingCourse.credits || !editingCourse.lecturer_id || !editingCourse.pages) {
            setError('Please fill in all required fields for editing (Title, Credits, Lecturer ID, Pages).');
            clearMessages();
            return;
        }

        setLoading(true); // Set loading for the operation
        setError('');
        try {
            await axios.put(`${backendUrl}/courses/${editingCourseId}`, editingCourse);
            setMessage('Course updated successfully!');
            setEditingCourseId(null); // Clear the editing state
            setEditingCourse({}); // Clear editing course data
            fetchCourses(); // Refresh the course list
            clearMessages();
        } catch (err) {
            console.error('Update error:', err);
            setError('Failed to update course: ' + (err.response?.data?.error || 'Server error.'));
            clearMessages();
        } finally {
            setLoading(false);
        }
    };

    // Handler for deleting a course
    const handleDeleteCourse = async (id) => {
        if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
            setLoading(true); // Set loading for the operation
            setError('');
            try {
                await axios.delete(`${backendUrl}/courses/${id}`);
                setMessage('Course deleted successfully!');
                fetchCourses(); // Refresh the course list
                clearMessages();
            } catch (err) {
                console.error('Delete error:', err);
                setError('Failed to delete course: ' + (err.response?.data?.error || 'Server error.'));
                clearMessages();
            } finally {
                setLoading(false);
            }
        }
    };

    // Handler for selecting files for upload
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files); // e.target.files is a FileList
        setUploadError('');
        setUploadMessage('');
    };

    // Handler for uploading files
    const handleFileUpload = async () => {
        if (!selectedFile || selectedFile.length === 0) {
            setUploadError('Please select files to upload.');
            clearUploadMessages();
            return;
        }

        setUploading(true);
        setUploadError('');
        setUploadMessage('');

        const formData = new FormData();
        for (let i = 0; i < selectedFile.length; i++) {
            formData.append('files', selectedFile[i]); // 'files' should match your backend field name
        }

        try {
            const response = await axios.post(`${backendUrl}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Upload successful:', response.data);
            setUploadMessage('File(s) uploaded successfully!');
            setSelectedFile(null); // Clear selected files after upload
            clearUploadMessages();
        } catch (err) {
            console.error('Upload error:', err);
            setUploadError('Failed to upload file(s): ' + (err.response?.data?.error || 'Server error.'));
            clearUploadMessages();
        } finally {
            setUploading(false);
        }
    };

    // Actual logout functionality
    const handleLogout = () => {
        // In a real application, you would:
        // 1. Clear authentication tokens (e.g., localStorage.removeItem('token'))
        // 2. Redirect to the login page
        alert('Logging out... Redirecting to login page.');
        // This will cause a full page reload and redirect to /login
        window.location.href = '/login'; // Or whatever your login page URL is
    };

    return (
        <div className="lecturer-dashboard-layout">
            <aside className="sidebar">
                <nav>
                    <ul>
                        <li>
                            <button
                                onClick={() => setActiveSection('dashboard')}
                                className={`sidebar-link ${activeSection === 'dashboard' ? 'active' : ''}`}
                            >
                                <span className="icon">🏠</span> Dashboard
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('my-courses')}
                                className={`sidebar-link ${activeSection === 'my-courses' ? 'active' : ''}`}
                            >
                                <span className="icon">📚</span> My Courses
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('course-editor')}
                                className={`sidebar-link ${activeSection === 'course-editor' ? 'active' : ''}`}
                            >
                                <span className="icon">✏️</span> Course Editor
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('file-upload')}
                                className={`sidebar-link ${activeSection === 'file-upload' ? 'active' : ''}`}
                            >
                                <span className="icon">📤</span> File Upload
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('assessment-builder')}
                                className={`sidebar-link ${activeSection === 'assessment-builder' ? 'active' : ''}`}
                            >
                                <span className="icon">📝</span> Assessment Builder
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('learner-progress')}
                                className={`sidebar-link ${activeSection === 'learner-progress' ? 'active' : ''}`}
                            >
                                <span className="icon">📈</span> Learner Progress
                            </button>
                        </li>
                    </ul>
                </nav>
                <button onClick={handleLogout} className="logout-button sidebar-link">
                    <span className="icon">➡️</span> Logout
                </button>
            </aside>

            <main className="dashboard-main-content">
                <header className="dashboard-header">
                    <h1>Lecturer Dashboard</h1>
                </header>

                <div className="dashboard-content">
                    {/* General messages for all operations */}
                    {message && <div className="message success full-width-section">{message}</div>}
                    {error && <div className="message error full-width-section">{error}</div>}

                    {/* Conditional Rendering based on activeSection */}

                    {activeSection === 'dashboard' && (
                        <div className="dashboard-section full-width-section">
                            <h2>Welcome to Your Lecturer Dashboard!</h2>
                            <p className="placeholder-content">
                                This is your central hub. Use the navigation on the left to manage your courses, edit course details, or upload course materials.
                            </p>
                        </div>
                    )}

                    {activeSection === 'my-courses' && (
                        <div className="dashboard-section my-modules full-width-section">
                            <h2>My Courses / Modules</h2>
                            <h3>Manage Your Course Offerings</h3>
                            {loading && <div className="loading-message">Loading courses...</div>}
                            {!loading && courses.length > 0 ? (
                                <div className="data-table-container">
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Description</th>
                                                <th>Credits</th>
                                                <th>Lecturer ID</th>
                                                <th>Pages</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {courses.map(course => (
                                                <tr key={course.id}>
                                                    <td data-label="Title">
                                                        {editingCourseId === course.id ? (
                                                            <input
                                                                type="text"
                                                                name="title"
                                                                value={editingCourse.title || ''}
                                                                onChange={(e) => handleInputChange(e, setEditingCourse)}
                                                                className="table-input"
                                                            />
                                                        ) : (
                                                            course.title
                                                        )}
                                                    </td>
                                                    <td data-label="Description">
                                                        {editingCourseId === course.id ? (
                                                            <textarea
                                                                name="description"
                                                                value={editingCourse.description || ''}
                                                                onChange={(e) => handleInputChange(e, setEditingCourse)}
                                                                className="table-textarea"
                                                            />
                                                        ) : (
                                                            course.description
                                                        )}
                                                    </td>
                                                    <td data-label="Credits">
                                                        {editingCourseId === course.id ? (
                                                            <input
                                                                type="number"
                                                                name="credits"
                                                                value={editingCourse.credits || ''}
                                                                onChange={(e) => handleInputChange(e, setEditingCourse)}
                                                                className="table-input"
                                                            />
                                                        ) : (
                                                            course.Credits
                                                        )}
                                                    </td>
                                                    <td data-label="Lecturer ID">
                                                        {editingCourseId === course.id ? (
                                                            <input
                                                                type="number"
                                                                name="lecturer_id"
                                                                value={editingCourse.lecturer_id || ''}
                                                                onChange={(e) => handleInputChange(e, setEditingCourse)}
                                                                className="table-input"
                                                            />
                                                        ) : (
                                                            course['Lecturer ID']
                                                        )}
                                                    </td>
                                                    <td data-label="Pages">
                                                        {editingCourseId === course.id ? (
                                                            <input
                                                                type="number"
                                                                name="pages"
                                                                value={editingCourse.pages || ''}
                                                                onChange={(e) => handleInputChange(e, setEditingCourse)}
                                                                min="1"
                                                                className="table-input"
                                                            />
                                                        ) : (
                                                            course.pages
                                                        )}
                                                    </td>
                                                    <td data-label="Actions" className="actions-cell">
                                                        {editingCourseId === course.id ? (
                                                            <>
                                                                <button onClick={handleUpdateCourse} className="save-button" disabled={loading}>Save</button>
                                                                <button onClick={() => { setEditingCourseId(null); setEditingCourse({}); clearMessages(); }} className="cancel-button" disabled={loading}>Cancel</button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <button onClick={() => handleEditCourse(course)} className="edit-button" disabled={loading}>Edit</button>
                                                                <button onClick={() => handleDeleteCourse(course.id)} className="delete-button" disabled={loading}>Delete</button>
                                                            </>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                !loading && <p className="placeholder-content">No courses available. Use the Course Editor to add your first course!</p>
                            )}
                        </div>
                    )}

                    {activeSection === 'course-editor' && (
                        <div className="dashboard-section module-editor full-width-section">
                            <h2>Course Editor</h2>
                            <h3>Add or Modify Course Details</h3>
                            <form onSubmit={handleAddCourse} className="course-form">
                                <div className="form-group">
                                    <label htmlFor="new-title">Course Title:</label>
                                    <input
                                        id="new-title"
                                        name="title"
                                        placeholder="e.g., Introduction to React"
                                        value={newCourse.title}
                                        onChange={(e) => handleInputChange(e, setNewCourse)}
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="new-description">Course Description:</label>
                                    <textarea
                                        id="new-description"
                                        name="description"
                                        placeholder="A brief overview of the course content."
                                        value={newCourse.description}
                                        onChange={(e) => handleInputChange(e, setNewCourse)}
                                        className="form-textarea"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="new-credits">Credits:</label>
                                    <input
                                        id="new-credits"
                                        type="number"
                                        name="credits"
                                        placeholder="e.g., 3"
                                        value={newCourse.credits}
                                        onChange={(e) => handleInputChange(e, setNewCourse)}
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="new-lecturer-id">Your Lecturer ID:</label>
                                    <input
                                        id="new-lecturer-id"
                                        type="number"
                                        name="lecturer_id"
                                        placeholder="e.g., 101"
                                        value={newCourse.lecturer_id}
                                        onChange={(e) => handleInputChange(e, setNewCourse)}
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="new-pages">Number of Pages:</label>
                                    <input
                                        id="new-pages"
                                        type="number"
                                        name="pages"
                                        placeholder="e.g., 50"
                                        value={newCourse.pages}
                                        onChange={(e) => handleInputChange(e, setNewCourse)}
                                        min="1"
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <button type="submit" className="add-course-button" disabled={loading}>
                                    {loading ? 'Adding Course...' : 'Add New Course'}
                                </button>
                            </form>
                        </div>
                    )}

                    {activeSection === 'file-upload' && (
                        <div className="dashboard-section file-upload full-width-section">
                            <h2>File Upload</h2>
                            <h3>Upload Course Materials (PDFs, PPTs, etc.)</h3>
                            <div className="file-upload-container">
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleFileChange}
                                    className="file-upload-input"
                                    id="file-upload"
                                    disabled={uploading}
                                />
                                <label htmlFor="file-upload" className="file-upload-label">
                                    <span>{selectedFile ? (selectedFile.length > 1 ? `${selectedFile.length} files selected` : selectedFile[0].name) : 'Choose File(s)'}</span>
                                </label>
                                <p className="file-upload-info">Max file size: 50MB. Allowed types: PDF, DOC, DOCX, PPT, PPTX, JPG, PNG.</p>
                                <button onClick={handleFileUpload} className="add-course-button" disabled={uploading || !selectedFile || selectedFile.length === 0}>
                                    {uploading ? 'Uploading...' : 'Upload File(s)'}
                                </button>
                                {uploadMessage && <div className="message success">{uploadMessage}</div>}
                                {uploadError && <div className="message error">{uploadError}</div>}
                            </div>
                        </div>
                    )}

                    {activeSection === 'assessment-builder' && (
                        <div className="dashboard-section assessment-builder full-width-section">
                            <h2>Assessment Builder</h2>
                            <h3>Create Quizzes, Exams, and Assignments</h3>
                            <div className="placeholder-content">
                                <p>Design and manage assessments for your courses here. You can set up questions, scoring, and deadlines.</p>
                                <p>(Feature coming soon!)</p>
                            </div>
                        </div>
                    )}

                    {activeSection === 'learner-progress' && (
                        <div className="dashboard-section learner-progress full-width-section">
                            <h2>Learner Progress</h2>
                            <h3>Monitor Student Performance</h3>
                            <div className="placeholder-content">
                                <p>Track your students' progress through modules, assessment scores, and completion rates.</p>
                                <p>(Feature coming soon!)</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default LecturerDashboard;