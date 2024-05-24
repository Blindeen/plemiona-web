import React from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

interface HCaptchaComponentProps {
    onCaptchaVerified: (token: string | null) => void;
}

const HCaptchaComponent: React.FC<HCaptchaComponentProps> = ({ onCaptchaVerified }) => {
    const handleVerify = (token: string) => {
        onCaptchaVerified(token);
    };

    const siteKey = process.env.HCAPTCHA_SITE_KEY;
    if (!siteKey) {
        throw new Error('HCAPTCHA_SITE_KEY is not defined');
    }

    return (
        <HCaptcha
            sitekey={siteKey}
            onVerify={handleVerify}
        />
    );
};

export default HCaptchaComponent;