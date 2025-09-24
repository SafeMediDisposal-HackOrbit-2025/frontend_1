import { useState, useEffect } from 'react';

interface ProfileData {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePicture: string;
}

const DEFAULT_PROFILE_PICTURE = 'https://mocha-cdn.com/0198db76-c8ba-7806-a428-601c83071fe5/Yogita.jpeg';

export function useProfileData() {
  const [profileData, setProfileData] = useState<ProfileData>({
    id: '25030024',
    name: 'KM Yogita',
    email: 'yogita@example.com',
    phone: '+91 9876543210',
    profilePicture: DEFAULT_PROFILE_PICTURE,
  });

  // Load profile data from localStorage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('profileData');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfileData(prev => ({ ...prev, ...parsedProfile }));
      } catch (error) {
        console.error('Failed to load profile data:', error);
      }
    }
  }, []);

  const updateProfile = (updates: Partial<ProfileData>) => {
    setProfileData(prev => {
      const updated = { ...prev, ...updates };
      // Save to localStorage
      localStorage.setItem('profileData', JSON.stringify(updated));
      return updated;
    });
  };

  const updateProfilePicture = (imageUrl: string) => {
    updateProfile({ profilePicture: imageUrl });
  };

  return {
    profileData,
    updateProfile,
    updateProfilePicture,
  };
}
