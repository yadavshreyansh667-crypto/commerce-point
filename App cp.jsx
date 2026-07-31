import React, { useState } from 'react';

// --- INITIAL MOCK DATABASE ---
const initialVideos = [
  {
    id: '1',
    title: 'Rules of Debit and Credit',
    classGrade: '11',
    subject: 'Accounts',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    comments: [{ user: 'Rahul (Class 11)', text: 'Sir, please explain real accounts again!' }]
  },
  {
    id: '2',
    title: 'Demand & Supply Curve',
    classGrade: '12',
    subject: 'Economics',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    comments: []
  }
];

const initialNotices = [
  { id: '1', text: 'Class 12 Accounts Test scheduled for this Sunday at 10 AM.', date: '2026-08-01' }
];

export default function CommercePoint() {
  // Application State
  const [role, setRole] = useState('Student'); // 'Student' or 'Teacher'
  const [studentName, setStudentName] = useState('Student_User');
  const [selectedClass, setSelectedClass] = useState('11');
  const [selectedSubject, setSelectedSubject] = useState('Accounts');
  
  // Data State
  const [videos, setVideos] = useState(initialVideos);
  const [notices, setNotices] = useState(initialNotices);
  const [blockedStudents, setBlockedStudents] = useState([]);
  const [activeVideo, setActiveVideo] = useState(initialVideos[0]);
  
  // Form Input States
  const [newComment, setNewComment] = useState('');
  const [newNoticeText, setNewNoticeText] = useState('');
  const [blockInputName, setBlockInputName] = useState('');
  
  // New Video Form (Teacher)
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoClass, setNewVideoClass] = useState('11');
  const [newVideoSubject, setNewVideoSubject] = useState('Accounts');
  const [newVideoUrl, setNewVideoUrl] = useState('');

  // Check if current student is blocked
  const isBlocked = blockedStudents.includes(studentName.trim().toLowerCase());

  // --- ACTIONS ---
  const handleAddComment = (videoId) => {
    if (!newComment.trim()) return;
    setVideos(prev => prev.map(vid => {
      if (vid.id === videoId) {
        return {
          ...vid,
          comments: [...vid.comments, { user: studentName, text: newComment }]
        };
      }
      return vid;
    }));
    setNewComment('');
  };

  const handleUploadVideo = (e) => {
    e.preventDefault();
    if (!newVideoTitle || !newVideoUrl) return;
    const newVid = {
      id: Date.now().toString(),
      title: newVideoTitle,
      classGrade: newVideoClass,
      subject: newVideoSubject,
      videoUrl: newVideoUrl,
      comments: []
    };
    setVideos([newVid, ...videos]);
    setNewVideoTitle('');
    setNewVideoUrl('');
    alert('Video published successfully!');
  };

  const handleAddNotice = (e) => {
    e.preventDefault();
    if (!newNoticeText.trim()) return;
    const newNotice = {
      id: Date.now().toString(),
      text: newNoticeText,
      date: new Date().toLocaleDateString()
    };
    setNotices([newNotice, ...notices]);
    setNewNoticeText('');
  };

  const handleBlockStudent = () => {
    if (!blockInputName.trim()) return;
    setBlockedStudents([...blockedStudents, blockInputName.trim().toLowerCase()]);
    setBlockInputName('');
    alert(`Student "${blockInputName}" blocked from interacting.`);
  };

  const filteredVideos = videos.filter(
    v => v.classGrade === selectedClass && v.subject === selectedSubject
  );

  return (
    <div style={styles.appContainer}>
      {/* Top Header */}
      <header style={styles.header}>
        <div>
          <h1 style={{ margin: 0 }}>COMMERCE POINT</h1>
          <small>Class 11 & 12 Learning Portal</small>
        </div>
        
        {/* Switch Role Controls (For Demo Testing) */}
        <div style={styles.roleSwitch}>
          <span>Current Portal Mode: </span>
          <button 
            style={role === 'Student' ? styles.activeRoleBtn : styles.btn} 
            onClick={() => setRole('Student')}
          >
            Student Mode
          </button>
          <button 
            style={role === 'Teacher' ? styles.activeRoleBtn : styles.btn} 
            onClick={() => setRole('Teacher')}
          >
            Teacher Mode (Admin)
          </button>
        </div>
      </header>

      {/* Notice Board Banner */}
      <div style={styles.noticeBanner}>
        <h4 style={{ margin: '0 0 8px 0', color: '#b91c1c' }}>📢 Notice Board</h4>
        {notices.length === 0 ? (
          <p style={{ margin: 0 }}>No new notices.</p>
        ) : (
          notices.map(n => (
            <div key={n.id} style={{ fontSize: '14px', marginBottom: '4px' }}>
              <strong>[{n.date}]:</strong> {n.text}
            </div>
          ))
        )}
      </div>

      {/* Main App Layout */}
      <div style={styles.mainContent}>
        
        {/* LEFT COLUMN: Controls & Video Selection */}
        <div style={styles.leftPanel}>
          
          {/* Class Selection */}
          <div style={styles.card}>
            <h3>Select Class</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                style={selectedClass === '11' ? styles.activeTab : styles.tab}
                onClick={() => setSelectedClass('11')}
              >
                Class 11
              </button>
              <button 
                style={selectedClass === '12' ? styles.activeTab : styles.tab}
                onClick={() => setSelectedClass('12')}
              >
                Class 12
              </button>
            </div>
          </div>

          {/* Subject Selection */}
          <div style={styles.card}>
            <h3>Select Subject</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Accounts', 'Economics', 'Business Studies'].map(subj => (
                <button
                  key={subj}
                  style={selectedSubject === subj ? styles.activeSubjBtn : styles.subjBtn}
                  onClick={() => setSelectedSubject(subj)}
                >
                  {subj}
                </button>
              ))}
            </div>
          </div>

          {/* Video List */}
          <div style={styles.card}>
            <h4>Lectures ({selectedClass}th - {selectedSubject})</h4>
            {filteredVideos.length === 0 ? (
              <p style={{ fontSize: '14px', color: '#666' }}>No videos in this topic yet.</p>
            ) : (
              filteredVideos.map(vid => (
                <div 
                  key={vid.id} 
                  style={{
                    ...styles.videoListItem,
                    borderLeft: activeVideo?.id === vid.id ? '4px solid #2563eb' : 'none'
                  }}
                  onClick={() => setActiveVideo(vid)}
                >
                  <strong>{vid.title}</strong>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Video Player / Comments / Teacher Dashboard */}
        <div style={styles.rightPanel}>
          
          {/* TEACHER DASHBOARD CONTROLS (Only visible in Teacher Mode) */}
          {role === 'Teacher' && (
            <div style={{ ...styles.card, backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
              <h3 style={{ marginTop: 0, color: '#166534' }}>Teacher Control Panel</h3>
              
              {/* Upload Video Form */}
              <form onSubmit={handleUploadVideo} style={{ marginBottom: '20px' }}>
                <h4>Upload New Lecture</h4>
                <input 
                  type="text" 
                  placeholder="Video Title" 
                  value={newVideoTitle} 
                  onChange={e => setNewVideoTitle(e.target.value)} 
                  style={styles.input} 
                  required 
                />
                <input 
                  type="url" 
                  placeholder="Video URL (Direct MP4 or Embed Link)" 
                  value={newVideoUrl} 
                  onChange={e => setNewVideoUrl(e.target.value)} 
                  style={styles.input} 
                  required 
                />
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <select value={newVideoClass} onChange={e => setNewVideoClass(e.target.value)} style={styles.input}>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12</option>
                  </select>
                  <select value={newVideoSubject} onChange={e => setNewVideoSubject(e.target.value)} style={styles.input}>
                    <option value="Accounts">Accounts</option>
                    <option value="Economics">Economics</option>
                    <option value="Business Studies">Business Studies</option>
                  </select>
                </div>
                <button type="submit" style={styles.actionBtn}>Publish Lecture</button>
              </form>

              <hr />

              {/* Publish Notice Form */}
              <form onSubmit={handleAddNotice} style={{ marginTop: '15px', marginBottom: '20px' }}>
                <h4>Post New Notice</h4>
                <input 
                  type="text" 
                  placeholder="Notice Announcement..." 
                  value={newNoticeText} 
                  onChange={e => setNewNoticeText(e.target.value)} 
                  style={styles.input} 
                  required 
                />
                <button type="submit" style={styles.actionBtn}>Publish Notice</button>
              </form>

              <hr />

              {/* Block Student */}
              <div style={{ marginTop: '15px' }}>
                <h4>Block Student</h4>
                <input 
                  type="text" 
                  placeholder="Student Username to Block" 
                  value={blockInputName} 
                  onChange={e => setBlockInputName(e.target.value)} 
                  style={styles.input} 
                />
                <button onClick={handleBlockStudent} style={{ ...styles.actionBtn, backgroundColor: '#dc2626' }}>Block Student</button>
              </div>
            </div>
          )}

          {/* PLAYER & DOUBTS SECTION */}
          {activeVideo ? (
            <div style={styles.card}>
              <h2>{activeVideo.title}</h2>
              <p style={{ color: '#64748b' }}>Class {activeVideo.classGrade} | {activeVideo.subject}</p>
              
              {/* HTML5 Video Player supporting standard video playback */}
              <video controls width="100%" height="400" src={activeVideo.videoUrl} style={{ borderRadius: '8px', backgroundColor: '#000' }}>
                Your browser does not support video playback.
              </video>

              {/* Doubt / Comment Section */}
              <div style={{ marginTop: '25px' }}>
                <h3>Ask Doubts & Comments</h3>
                
                {isBlocked ? (
                  <div style={styles.blockedAlert}>
                    🚫 You have been restricted by the teacher from asking doubts.
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <input 
                      type="text" 
                      placeholder="Type your doubt here..." 
                      value={newComment} 
                      onChange={e => setNewComment(e.target.value)}
                      style={{ ...styles.input, flex: 1, marginBottom: 0 }}
                    />
                    <button onClick={() => handleAddComment(activeVideo.id)} style={styles.actionBtn}>
                      Send Doubt
                    </button>
                  </div>
                )}

                {/* Comment List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {activeVideo.comments.length === 0 ? (
                    <p style={{ color: '#94a3b8' }}>No doubts asked yet.</p>
                  ) : (
                    activeVideo.comments.map((c, idx) => (
                      <div key={idx} style={styles.commentBox}>
                        <strong>{c.user}</strong>
                        <p style={{ margin: '4px 0 0 0' }}>{c.text}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div style={styles.card}>
              <p>Select a video to start watching.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// Inline Styling Object (Clean & Lightweight)
const styles = {
  appContainer: { fontFamily: 'Segoe UI, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '15px', backgroundColor: '#f8fafc', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b', color: '#fff', padding: '15px 20px', borderRadius: '8px' },
  roleSwitch: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' },
  btn: { padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#475569', color: '#fff' },
  activeRoleBtn: { padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold' },
  noticeBanner: { backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '12px', borderRadius: '8px', margin: '15px 0' },
  mainContent: { display: 'grid', gridTemplateColumns: '300px 1fr', gap: '20px' },
  leftPanel: { display: 'flex', flexDirection: 'column', gap: '15px' },
  rightPanel: { display: 'flex', flexDirection: 'column', gap: '15px' },
  card: { backgroundColor: '#fff', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' },
  tab: { flex: 1, padding: '8px', border: '1px solid #cbd5e1', backgroundColor: '#fff', cursor: 'pointer', borderRadius: '4px' },
  activeTab: { flex: 1, padding: '8px', border: 'none', backgroundColor: '#2563eb', color: '#fff', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' },
  subjBtn: { padding: '10px', textAlign: 'left', border: '1px solid #cbd5e1', backgroundColor: '#fff', cursor: 'pointer', borderRadius: '4px' },
  activeSubjBtn: { padding: '10px', textAlign: 'left', border: 'none', backgroundColor: '#0f172a', color: '#fff', cursor: 'pointer', borderRadius: '4px', fontWeight: 'bold' },
  videoListItem: { padding: '10px', backgroundColor: '#f1f5f9', cursor: 'pointer', borderRadius: '4px', marginBottom: '8px' },
  input: { width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1', marginBottom: '10px', boxSizing: 'border-box' },
  actionBtn: { padding: '8px 16px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  blockedAlert: { padding: '10px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '4px', fontWeight: 'bold' },
  commentBox: { backgroundColor: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }
};

