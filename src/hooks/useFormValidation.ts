import { useState } from 'react';

export const useFormValidation = (fields: Record<string, string>) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const validateForm = () => {
        const missingFields = Object.keys(fields).filter(field => !fields[field]);
        if (missingFields.length > 0) {
            setErrorMessage(`Please fill in the following fields: ${missingFields.join(', ')}`);
            return false;
        }
        setErrorMessage(null);
        return true;
    };

    return { errorMessage, validateForm };
};
