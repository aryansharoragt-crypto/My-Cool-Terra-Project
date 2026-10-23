import React, {useState } from "react";

export default function IntroPage({ onIntroComplete }) {

    const [currentStep, setCurrentStep] = useState(0);

    const storyLines = [
        "A strange, pulsing anomaly has just bypassed your local system firewall...",
        "Recieving encrypted telemetry signal... Source: Hack Club Terra Core Network.",
        "System authorization complete. Materializing cargo capsule on your terminal workspace now..."
    ];

    const handleNext = () => {
        
        if (currentStep < storyLines.length - 1) {
            setCurrentStep(currentStep+1)
        }

        else {
            onIntroComplete();
        }
    }

    return (
        <div style={{ display: 'flex', width: '100%', minHeight: '100vh', background: '#1e1b18', alignItems: 'center', justifyContent: 'center', fontFamily: 'Courier New, Courier, monospace', boxSizing: 'border-box', padding: '20px' }}>
            
            <div style={{ background: '#2d241e', maxWidth: '400px', width: '85%', padding: '40px 30px', borderRadius: '12px', border: '2px solid #78350f', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)', textAlign: 'center', color: '#f8fafc' }}>
                
                <div style={{ fontSize: '3rem', marginBottom: '24px' }}>📡</div>
                
                <p style={{ fontSize: '16px', lineHeight: '1.6', minHeight: '80px', margin: '0 0 30px 0', color: '#fef3c7' }}>
                    {storyLines[currentStep]}
                </p>
                
                <button 
                onClick={handleNext}
                style={{ background: '#b45309 ', color: 'amber', border: '2px solid #2563eb', padding: '12px 24px', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', outline: 'none' }}>
                    {currentStep === storyLines.length - 1 ? "Decrypt Terminal" : "Continue"}
                </button>
            </div>
        </div>
    );

}