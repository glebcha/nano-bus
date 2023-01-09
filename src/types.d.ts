export type EventType = string;

export type EventDetail = unknown;

export type SubscribeOptions = {
  id?: string,
};

export type BusEvents = {
  [type: string]: {
    [id: string]: AbortController | null
  }
}
