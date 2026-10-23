import React, { useState, useEffect } from 'react';

export default function HatchPage({ onHatchComplete }) {
    
    const [typedName, setTypedName] = useState('')
    const [isWiggling, setIsWiggling] = useState(false);
    
    useEffect(() => {
        if (!typedName) return;
        setIsWiggling(true);

        const timer = setTimeout(() => setIsWiggling(false), 150);
        return () => clearTimeout(timer);
    }, [typedName]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!typedName.trim()) return;
        onHatchComplete(typedName.trim());
    };
    
    return (
        <div style={styles.pageContainer}>
            <div style={styles.leftPasture}>
                <div style = {{ ...styles.eggContainer,
                    transform: isWiggling ? 'rotate(8deg) scale(1.05)' : 'rotate(0deg)',
                    transition: 'transform 0.1s ease-in-out'
                 }}>
                    🥚
                 </div>
            </div>

            <div style={styles.rightSlate}>
                 <h2 style={styles.title}>An unidentified signature has entered your terminal...</h2>
                 <p style={styles.title}>Your coding sprints will help incubate the core. Claim its permanent identity below.</p>

                 <form onSubmit={handleSubmit} style={styles.namingForm}>
                    <input
                        type='text'
                        placeholder='Name your companion...'
                        value={typedName}
                        maxLength={16}
                        onChange={(e) => setTypedName(e.target.value)}
                        style={styles.underlineInput}>
                    </input>

                    <button style={styles.pixelButton} type='submit'>
                        Initialize Bond
                    </button>

                 </form>
            </div>
        </div>
    );

}

//Most of this styling block was made by AI (I got too lazy :|)

const styles = {
  pageContainer: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    background: '#f8fafc',
    overflow: 'hidden',
    fontFamily: 'system-ui, sans-serif'
  },
  leftPasture: {
    flex: '0 0 55%',
    background: '#f5ece1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRight: '6px solid #d6c4ae'
  },
  eggContainer: {
    fontSize: '6rem',
    background: 'white',
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
    borderColor: '#b45309'
  },
  rightSlate: {
    flex: '0 0 45%',
    padding: '60px 40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: '#fffdfa'
  },
  title: {
    fontSize: '22px',
    color: '#1e293b',
    fontWeight: '700',
    lineHeight: '1.4',
    marginBottom: '12px'
  },
  subtitle: {
    fontSize: '14px',
    color: '#64748b',
    lineHeight: '1.6',
    marginBottom: '40px'
  },
  namingForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    alignItems: 'flex-start'
  },
  underlineInput: {
    width: '100%',
    maxWidth: '280px',
    padding: '8px 0',
    fontSize: '16px',
    border: 'none',
    borderBottom: '2px solid #cbd5e1',
    outline: 'none',
    color: '#334155'
  },
  pixelButton: {
    background: '#15803d ',
    color: 'white',
    fontSize: '14px',
    fontWeight: 'bold',
    padding: '12px 24px',
    cursor: 'pointer',
    border: '3px solid #15803d',
    boxShadow: '2px 2px 0px #166534',
    outline: 'none'
  }
};
