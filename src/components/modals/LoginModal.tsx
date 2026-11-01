import React from 'react';
import { AuthModal } from '../auth/AuthModal';

/**
 * Re-export AuthModal to ensure full backward compatibility
 * with any components importing LoginModal.
 */
export const LoginModal: React.FC = () => {
  return <AuthModal />;
};

export default LoginModal;
