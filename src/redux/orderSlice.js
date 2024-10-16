import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {

  const response = await new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, date: '2024-01-01', status: 'Delivered', total: 30 },
        { id: 2, date: '2024-01-05', status: 'Pending', total: 20 },
      ]);
    }, 1000);
  });
  return response;
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
