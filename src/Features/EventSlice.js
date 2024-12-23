import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Insert event
export const insertEvent = createAsyncThunk(
  "Eventcount/insertEvent",
  async (EventData) => {
    try {
      const response = await axios.post("https://server-euce.onrender.com/insertEvent", {
        name: EventData.name,
        description: EventData.description,
        date: EventData.date,
        location: EventData.location,
        type: EventData.type,
        price: EventData.price,
        tickets: EventData.tickets,
        image: EventData.image,
        schedule: EventData.schedule,
        organizer: EventData.organizer,
        contact: EventData.contact, 
        status: EventData.status, 
        notes: EventData.notes, 
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

// get event by id
export const getEventById = createAsyncThunk(
  "Eventcount/getEventById",
  async (eventId)=> {
    try {
      const response = await axios.get(`https://server-euce.onrender.com/getEvent/${eventId}`)
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error(error);      
    }
  }
)

// Get events
export const getEvent = createAsyncThunk("Eventcount/getEvent", async () => {
  try {
    const response = await axios.get("https://server-euce.onrender.com/getEvents");
    return response.data.events;
  } catch (error) {
    console.error(error);
  }
});

// Update event
export const updateEvent = createAsyncThunk(
  "Eventcount/updateEvent",
  async ({id,data}, { rejectWithValue }) => {
    try {
      const response = await axios.put("https://server-euce.onrender.com/updateEvent", {
        eventId : id,
        ...data,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : "Unknown error occurred");
    }
  }
);



// Delete event
export const deleteEvent = createAsyncThunk(
  "Eventcount/deleteEvent",
  async (eventId) => {
    try {
      const response = await axios.delete(
        `https://server-euce.onrender.com/deleteEvent/${eventId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialValues = {
  Event: [],
  currentEvent: null,
  message: "",
  isLoading: false,
  isSucces: false,
  isError: false,
};

export const EventSlice = createSlice({
  name: "Eventcount",
  initialState: initialValues,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(insertEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(insertEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.message = action.payload;
      })
      .addCase(insertEvent.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.Event = action.payload; 
      })
      .addCase(getEvent.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(updateEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.message = action.payload.message;
        state.currentEvent = action.payload.event;
      })
      .addCase(updateEvent.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
      })
      .addCase(deleteEvent.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
    
      // getEventById
      .addCase(getEventById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEventById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.currentEvent = action.payload;
      }).addCase(getEventById.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default EventSlice.reducer;
