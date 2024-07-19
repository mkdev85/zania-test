import type { EffectCallback } from "react";
import { useEffect } from "react";

/**
 * Custom `useEffect` hook that runs the provided effect only once, on component mount.
 *
 * @param {EffectCallback} effect - The effect function to run on mount.
 */
export const useOnMount = (effect: EffectCallback) => {
  useEffect(effect, []); // eslint-disable-line react-hooks/exhaustive-deps
};
