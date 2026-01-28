import React from 'react';
import { useTranslation } from 'react-i18next';
import { AudioGuideButton } from './AudioGuideButton';
import { audioGuides, AudioGuideKey } from '@/i18n/audioGuides';

interface PageAudioGuideProps {
  pageKey: AudioGuideKey;
  variant?: 'default' | 'floating';
  className?: string;
}

export const PageAudioGuide: React.FC<PageAudioGuideProps> = ({
  pageKey,
  variant = 'floating',
  className,
}) => {
  const { i18n } = useTranslation();
  
  const currentLang = i18n.language as keyof typeof audioGuides;
  const guides = audioGuides[currentLang] || audioGuides.en;
  const text = guides[pageKey] || audioGuides.en[pageKey];

  if (!text) return null;

  return (
    <AudioGuideButton
      text={text}
      variant={variant}
      size="lg"
      className={className}
    />
  );
};
