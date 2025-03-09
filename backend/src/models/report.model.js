import mongoose from 'mongoose';
import { Schema } from 'mongoose';
const reportSchema = new Schema({
  reportedBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  reviewedBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  description: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  aiLabel: { 
    type: Object, 
    required: true 
  },
  pollutionType: { 
    type: String, 
    enum: ['water', 'plastic', 'land', 'chemical','noise'], 
    required: true 
  },
  address: {
    city: { 
      type: String, 
      required: true 
    },
    state: { 
      type: String, 
      required: true 
    },
    locality: { 
      type: String, 
      required: true 
    }
  },
  reportStatus:{
    type:Number,
    default:0
  }
}, { timestamps: true });

export const Report = mongoose.model('Report', reportSchema);

// 0 not reviewed 
// 1 completed
// 3 rejected
// 2 processing