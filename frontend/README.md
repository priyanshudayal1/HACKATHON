# Frontend Styling Guidelines

## Core Technologies & Libraries
- Tailwind CSS for responsive and utility-first styling
- Framer Motion for smooth animations and transitions
- Lucide React for consistent, modern iconography
- React Hot Toast for elegant notifications
- React Router for navigation
- Custom stores for API integration

## Design System

### Colors
```tailwind
Primary: 
- bg-indigo-600 (buttons, active states)
- hover:bg-indigo-700
- text-indigo-600 (links, highlights)

Accent:
- bg-emerald-500 (success states)
- bg-rose-500 (error states)
- bg-amber-500 (warning states)

Neutral:
- bg-gray-50 (background)
- bg-white (cards)
- text-gray-900 (primary text)
- text-gray-600 (secondary text)
```

### Typography
- Headers: `text-2xl font-bold text-gray-900`
- Subheaders: `text-lg font-semibold text-gray-800`
- Body: `text-base text-gray-600`
- Small text: `text-sm text-gray-500`

### Component Styling

#### Buttons
```tailwind
Primary:
text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg
transition-all duration-200 ease-in-out

Secondary:
text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg
border border-indigo-200

Disabled:
bg-gray-100 text-gray-400 cursor-not-allowed
```

#### Cards
```tailwind
Basic Card:
bg-white rounded-xl shadow-sm hover:shadow-md transition-all
duration-200 p-6

Feature Card:
bg-white rounded-xl shadow-lg hover:shadow-xl
transition-all duration-300 p-6 border border-gray-100
```

#### Modals
```tailwind
Modal Backdrop:
fixed inset-0 bg-black/50 backdrop-blur-sm

Modal Content:
bg-white rounded-2xl shadow-xl p-6 max-w-md w-full mx-auto
```

#### Forms
```tailwind
Input Fields:
w-full px-4 py-2 rounded-lg border border-gray-200
focus:ring-2 focus:ring-indigo-500 focus:border-transparent
outline-none transition-all duration-200

Labels:
text-sm font-medium text-gray-700 mb-1
```

### Animation Guidelines
- Use Framer Motion for:
  - Page transitions: fade in/out
  - Card hover effects: slight scale
  - Modal animations: slide up + fade
  - Loading states: subtle pulse
  - List items: stagger animation

### Icons
- Use Lucide React icons consistently
- Icon sizes:
  - Small: 16px
  - Medium: 20px
  - Large: 24px
- Add hover effects: `hover:text-indigo-600 transition-colors`

### Spacing
- Consistent padding: p-4, p-6, p-8
- Gaps between items: gap-4, gap-6
- Section margins: my-8, my-12

### Responsive Design
- Mobile-first approach
- Common breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px

### Interactive Elements
```tailwind
Hover Effects:
hover:scale-105 transition-transform duration-200

Active States:
active:scale-95 transition-transform duration-200

Focus States:
focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
```

### Loading States
- Use skelton loading with `animate-pulse`
- Overlay with backdrop blur for loading states
- Subtle transitions between states

### Notifications
- Use React Hot Toast with custom styling
- Toast positions: top-right
- Include icons for different message types
- Add subtle slide animations

## Best Practices
1. Maintain consistent spacing throughout components
2. Use semantic color names in components
3. Implement smooth transitions for all interactive elements
4. Ensure proper contrast ratios for accessibility
5. Use responsive design patterns
6. Keep animations subtle and purposeful
7. Maintain consistent icon usage
8. Implement proper loading states
9. Use proper error states and feedback
10. Ensure consistent typography scale