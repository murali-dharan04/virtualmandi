import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTextToSpeech } from '@/hooks/use-text-to-speech';
import { cn } from '@/lib/utils';

interface AudioGuideButtonProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'floating';
}

export const AudioGuideButton: React.FC<AudioGuideButtonProps> = ({
  text,
  className,
  size = 'md',
  variant = 'default',
}) => {
  const { toggle, isSpeaking, isSupported } = useTextToSpeech({ rate: 0.85 });

  if (!isSupported) return null;

  const sizeClasses = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-14 w-14',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  if (variant === 'floating') {
    return (
      <motion.div
        className={cn(
          'fixed bottom-6 right-6 z-50',
          className
        )}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      >
        <Button
          onClick={() => toggle(text)}
          className={cn(
            'rounded-full shadow-xl',
            sizeClasses[size],
            isSpeaking 
              ? 'bg-secondary hover:bg-secondary/90' 
              : 'bg-primary hover:bg-primary/90'
          )}
          aria-label={isSpeaking ? 'Stop audio guide' : 'Play audio guide'}
        >
          <AnimatePresence mode="wait">
            {isSpeaking ? (
              <motion.div
                key="speaking"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <VolumeX className={iconSizes[size]} />
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Volume2 className={iconSizes[size]} />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
        
        {/* Pulse animation when speaking */}
        {isSpeaking && (
          <motion.div
            className="absolute inset-0 rounded-full bg-secondary/30"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </motion.div>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => toggle(text)}
      className={cn(
        'rounded-full border-2',
        sizeClasses[size],
        isSpeaking 
          ? 'border-secondary bg-secondary/10 text-secondary' 
          : 'border-primary/50 text-primary hover:bg-primary/10',
        className
      )}
      aria-label={isSpeaking ? 'Stop audio guide' : 'Play audio guide'}
    >
      <AnimatePresence mode="wait">
        {isSpeaking ? (
          <motion.div
            key="speaking"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <VolumeX className={iconSizes[size]} />
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Volume2 className={iconSizes[size]} />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  );
};
