// Default - Boolean
export const DefBoolean = {
  type: Boolean,
  default: false,
};

// Required - Boolean
export const ReqBoolean = {
  type: Boolean,
  required: true,
};

// Default - Number
export const DefNumber = {
  type: Number,
  default: 0,
};

// Required - Number
export const ReqNumber = {
  type: Number,
  required: true,
};

// Required - Date
export const ReqDate = {
  type: Date,
  required: true,
};

export const DefDate = {
  type: Date,
  default: Date.now,
};

// Required - String
export const ReqString = {
  type: String,
  required: true,
  trim: true,
};

// Required - Unique - String
export const RUString = {
  type: String,
  required: true,
  trim: true,
  unique: true,
};
