// import { Reducer } from 'redux'

// import {
//   CounterAddAction,
//   CounterDeleteAction,
//   CounterMinusAction,
//   CounterPlusAction,
//   CounterTimerAction,
//   COUNTER_ADD,
//   COUNTER_DELETE,
//   MINUS_COUNTER,
//   PLUS_COUNTER,
//   TIMER_COUNTER,
// } from './counters/actions'

// import { countersReducer, CounterState } from './counters/reduser'

// export type RootState = {
//   counters: CounterState
// }
// const initialState: RootState = {
//   counters: {
//     data: [],
//   },
// }

// type CountersAction =
//   | CounterAddAction
//   | CounterDeleteAction
//   | CounterTimerAction
//   | CounterMinusAction
//   | CounterPlusAction

// export const rootReducer: Reducer<RootState, CountersAction> = (state = initialState, action) => {
//   switch (action.type) {
//     case COUNTER_ADD:
//     case TIMER_COUNTER:
//     case MINUS_COUNTER:
//     case PLUS_COUNTER:
//     case COUNTER_DELETE:
//       return {
//         ...state,
//         counters: countersReducer(state.counters, action),
//       }
//     default:
//       return state
//   }
// }
