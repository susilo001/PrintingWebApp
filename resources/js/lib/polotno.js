import { createStore } from "polotno/model/store";

const store = createStore({
  key: import.meta.env.VITE_POLOTNO_API_KEY,
});

store.addPage();

export default store;
