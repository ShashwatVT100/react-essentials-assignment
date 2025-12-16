import './App.css';
import { useState } from 'react';

function App() {
    const [light, setLight] = useState(true);
    const [ids, setIds] = useState(1);

    const users = [
        {
            id: 1,
            image: 'https://api.dicebear.com/8.x/initials/svg?seed=Alison&backgroundColor=c0a1f0',
            name: 'Alison Becker',
            deg: 'Senior Full Stack Developer',
            detail: 'Experienced in developing and maintaining large-scale web applications. Passionate about clean code and scalable architecture.',
            skills: ['JavaScript', 'React', 'Node.js', 'AWS', 'MongoDB']
        },
        {
            id: 2,
            image: 'https://api.dicebear.com/8.x/initials/svg?seed=Michael&backgroundColor=88b8f2',
            name: 'Michael Chen',
            deg: 'Data Scientist',
            detail: 'Specializes in predictive modeling and machine learning. Proven ability to translate complex data into actionable business insights.',
            skills: ['Python', 'R', 'TensorFlow', 'SQL', 'Data Visualization']
        },
        {
            id: 3,
            image: 'https://api.dicebear.com/8.x/initials/svg?seed=Sara&backgroundColor=f0c0a1',
            name: 'Sara Patel',
            deg: 'UX/UI Designer',
            detail: 'A creative designer focused on user-centered design principles. Excels at prototyping, user research, and creating intuitive interfaces.',
            skills: ['Figma', 'Sketch', 'User Research', 'Prototyping', 'Interaction Design']
        },
        {
            id: 4,
            image: 'https://api.dicebear.com/8.x/initials/svg?seed=David&backgroundColor=88f2b8',
            name: 'David Rodriguez',
            deg: 'DevOps Engineer',
            detail: 'Expert in automation, CI/CD pipelines, and cloud infrastructure management. Committed to improving system reliability and deployment speed.',
            skills: ['Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'Azure']
        },
        {
            id: 5,
            image: 'https://api.dicebear.com/8.x/initials/svg?seed=Emily&backgroundColor=f288b8',
            name: 'Emily Wong',
            deg: 'Technical Writer',
            detail: 'Produces clear, concise, and accurate documentation for software products. Bridges the gap between technical teams and end-users.',
            skills: ['Documentation', 'API Docs', 'Markdown', 'Git', 'Confluence']
        }
    ];

    const user = users.find(userd => userd.id === ids);
    const themeClass = light ? 'light' : 'dark';

    function Header() {
        return (
            <header className="header">
                <h1>Portfolio Card</h1>
                <div className="header_css"></div>
            </header>
        );
    }
    function Avatar() {
        return (
            <div className="avatar">
                <img src={user.image} alt="Profile" className="avatarimg" />
                <div className="avatar_css"></div>
            </div>
        );
    }
    function Details() {
        return (
            <div className="detail">
                <h2 className="detailh" text-align="center" style={{ color: `${light ? '#333' : '#e0e0e0'}` }}>Details</h2>
                <div className="detailcss"></div>
                <p>
                    {user.detail}
                </p>
            </div>
        )
    }
    function Description() {
        return (
            <div className="description" style={{ color: `${light ? '#333' : '#ccc8c8ff'}` }}>
                <h3 className="name">{user.name}</h3>
                <h4 className="degree">{user.deg}</h4>
                <div className="description_css"></div>
            </div>
        );
    }
    function Skills() {
        return (
            <div className="skillcon">
                {user.skills.map((skills, index) => (<span key={index} className="skill">{skills}</span>))}
            </div>
        )
    }
    function PortfolioCard() {
        return (
            <div className="portcard">
                <Header />
                <div style={{ color: `${light ? '#222' : '#e0e0e0'}` }}>
                    <div className="profhead">
                        <Avatar />
                        <Description />
                    </div>
                    <Details />
                    <h3 className="skillh" style={{ color: `${light ? '#333' : '#e0e0e0'}` }}>Skills</h3>
                    <Skills />
                </div>
                <div style={{ padding: '10px' }}>
                    <div className='buttons'>
                        <button
                            onClick={() => setLight(!light)}
                            className={`theme-button ${themeClass}`}
                        >
                            Toggle Theme
                        </button>
                        <button
                            disabled={ids < 2}
                            onClick={() => setIds(ids - 1)}
                            className={`theme-button ${themeClass}`}
                        >
                            Previous
                        </button>
                        <button
                            disabled={ids > 4}
                            onClick={() => setIds(ids + 1)}
                            className={`theme-button ${themeClass}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div className='app' style={{ backgroundColor: `${light ? '#f8f9fa' : '#222'}` }}>
            <div className='theme'>
                <button
                    onClick={() => setLight(!light)}
                    className={`theme-button ${themeClass}`}
                >
                    Toggle Theme
                </button>
            </div>
            <PortfolioCard />
        </div>
    );
}

export default App;