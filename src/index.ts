type Subscriber<T> = (state: T) => void;

// const logState: Subscriber<number> = (state) => {
//   console.log(`New state: ${state}`);
// }

// logState(5);

export type Selector<T, U> = (state: T) => U;

// interface AppState {
//   count: number;
//   user: string;
// }

// const selectCount: Selector<AppState, number> = (state) => state.count;

// const state = { count: 10, user: "Alice" };

// console.log(selectCount(state));

export interface Store<T> {
  getState: () => T;
  updateState: (updater: (previousState: T) => T) => void;
  subscriber: <U>(
    selector: Selector<T, U>,
    callback: (selectedState: U) => void
  ) => () => void;
}

interface AppState {
  count: number;
  user: string;
}

const state = { count: 10, user: "Alice" };

const store: Store<AppState> = {
  getState: () => state,
  updateState: () => {},
  subscriber: <U>(
    selector: Selector<AppState, U>,
    callback: (selectedState: U) => void
  ) => {
    const selected = selector(store.getState());
    callback(selected);
    return () => console.log("Unsubscribed");
  },
};

const selectCount: Selector<AppState, number> = (state) => state.count;

const unsubscribed = store.subscriber(selectCount, (count) => {
  console.log(`Count updated: ${count}`);
});

unsubscribed();
