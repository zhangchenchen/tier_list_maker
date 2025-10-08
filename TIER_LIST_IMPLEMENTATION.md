# Tier List Maker Implementation

## Overview
Successfully implemented an interactive Tier List Maker component in the hero section of the landing page, based on the reference from https://tier-list-maker-two.vercel.app/

## Features Implemented

### 1. **Interactive Tier System**
- 5 tiers with distinct colors:
  - **S Tier** (Red - `bg-red-500`)
  - **A Tier** (Orange - `bg-orange-500`)
  - **B Tier** (Yellow - `bg-yellow-400`)
  - **C Tier** (Green - `bg-green-400`)
  - **D Tier** (Blue - `bg-blue-500`)

### 2. **Control Buttons**
Three main action buttons in the top-right corner:
- **Add Item** (Upload) - Upload images from local device
- **Save Image** (Download) - Export entire tier list as PNG
- **Delete All** (Trash) - Clear all items with confirmation

### 3. **Drag & Drop Functionality**
- **Desktop**: Full drag-and-drop support between tiers
- **Mobile**: Double-tap items to cycle through tiers
- Smooth transitions and visual feedback

### 4. **Item Management**
- Upload multiple images at once
- Remove individual items with hover-activated delete button (X icon)
- All uploaded items default to D tier
- Real-time tier organization

### 5. **Export Functionality**
- Export tier list as high-quality PNG image (2x scale)
- Automatic filename with timestamp
- Dark theme background for exported images

### 6. **User Experience**
- Toast notifications for all actions
- Empty state indicators for each tier
- Responsive design (mobile & desktop)
- Hover effects and visual feedback
- Confirmation dialogs for destructive actions

## Technical Implementation

### Files Created/Modified

1. **`src/components/blocks/hero/tier-list-maker.tsx`** (NEW)
   - Main interactive component
   - State management for items
   - Drag & drop logic
   - Image upload handling
   - Export functionality using html2canvas

2. **`src/components/blocks/hero/index.tsx`** (MODIFIED)
   - Added TierListMaker component import
   - Integrated component below hero description

3. **`package.json`** (MODIFIED)
   - Added `html2canvas` dependency for image export

### Dependencies Added
```json
{
  "html2canvas": "^1.4.1"
}
```

### Key Technologies
- **React Hooks**: useState, useRef, useCallback
- **html2canvas**: For tier list export
- **Tailwind CSS**: Styling and responsive design
- **Sonner**: Toast notifications
- **Lucide React**: Icons (Upload, Download, Trash2, X)

## User Instructions

### Desktop Usage
1. Click "Add Item" to upload images
2. Drag items between tiers to organize
3. Click X on items to remove them
4. Click "Save Image" to export as PNG
5. Click "Delete All" to clear everything

### Mobile Usage
1. Tap "Add Item" to upload images
2. Double-tap items to move them to the next tier
3. Tap X on items to remove them
4. Tap "Save Image" to export as PNG
5. Tap "Delete All" to clear everything

## English Localization
All text is in English as required:
- Button labels: "Add Item", "Save Image", "Delete All"
- Instructions: Desktop & Mobile usage hints
- Toast messages: Success, error, and info notifications
- Empty state text: "Drop items here or double-click items to move"

## Styling Features
- Dark theme with gray-900 background
- Color-coded tier labels with bold text
- Smooth hover animations
- Border highlights on hover
- Shadow effects for depth
- Responsive sizing for all screen sizes

## Future Enhancements (Optional)
- Custom tier names and colors
- Persistent storage (localStorage/database)
- Share to social media
- Template library
- Text labels for items
- Undo/Redo functionality

## Testing
- Test on desktop browsers (Chrome, Firefox, Safari)
- Test on mobile devices (iOS, Android)
- Test drag & drop functionality
- Test image upload (multiple formats: JPG, PNG, GIF)
- Test export functionality
- Test responsive breakpoints

---

**Status**: ✅ Complete and Ready for Testing
**Language**: English (as required)
**Reference**: Based on https://tier-list-maker-two.vercel.app/ (Japanese version)

