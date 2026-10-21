/**
 * A deferred action used by page objects to apply one strategy.
 */
export type StrategySetter = () => Promise<void> | void;
