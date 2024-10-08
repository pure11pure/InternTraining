import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// สร้าง Function สำหรับดึงข้อมูลจาก API
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  return response.json()
})

// สร้าง slice สำหรับจัดการข้อมูลของการดึงข้อมูลจาก API
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    // จัดการสถานะของการดึงข้อมูล
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default postsSlice.reducer