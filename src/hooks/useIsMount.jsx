import { useRef, useEffect } from "react";

/**
 * Hook that returns a flag telling whether the current render is the first render (when * the component was mounted) or a subsequent.
 * @returns boolean
 */
export const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};
