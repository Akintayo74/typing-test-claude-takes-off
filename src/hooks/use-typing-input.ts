import * as React from 'react';
import { trackErrors } from '../helpers/typing-test.helpers';

interface UseTypingInputReturn {
  userInput: string;
  errorIndices: Set<number>;
  currentIndex: number;
  isComplete: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetInput: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  focusInput: () => void;
}

interface UseTypingInputOptions {
  passage: string;
  isDisabled: boolean;
  onFirstKeystroke?: () => void;
}

/**
 * Hook for managing typing input, error tracking, and the hidden input element.
 */
export function useTypingInput({
  passage,
  isDisabled,
  onFirstKeystroke,
}: UseTypingInputOptions): UseTypingInputReturn {
  const [userInput, setUserInput] = React.useState('');
  const [errorIndices, setErrorIndices] = React.useState<Set<number>>(new Set());
  const [hasStartedTyping, setHasStartedTyping] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Focus input on mount
  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isDisabled) return;

      const newInput = e.target.value;

      // Trigger first keystroke callback
      if (!hasStartedTyping && newInput.length > 0) {
        setHasStartedTyping(true);
        onFirstKeystroke?.();
      }

      // Don't allow typing beyond passage length
      if (newInput.length > passage.length) {
        return;
      }

      // Track errors
      setErrorIndices((prev) => trackErrors(newInput, passage, prev));
      setUserInput(newInput);
    },
    [isDisabled, hasStartedTyping, passage, onFirstKeystroke]
  );

  const resetInput = React.useCallback(() => {
    setUserInput('');
    setErrorIndices(new Set());
    setHasStartedTyping(false);
  }, []);

  const focusInput = React.useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const isComplete = userInput.length === passage.length && passage.length > 0;

  return {
    userInput,
    errorIndices,
    currentIndex: userInput.length,
    isComplete,
    handleInputChange,
    resetInput,
    inputRef,
    focusInput,
  };
}
