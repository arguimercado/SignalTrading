# CountrySelectField Component

A stunning, searchable country selection component built with shadcn's Popover and Command components, featuring country flags and smooth animations.

## Features

- 🔍 **Search Functionality**: Type to filter countries
- 🌍 **Country Flags**: Beautiful flag emojis for each country
- 🎨 **Modern Design**: Dark theme with glassmorphism effects
- ⚡ **Performance**: Memoized country list for optimal performance
- 🎯 **Accessibility**: Full keyboard navigation and screen reader support
- 💾 **Form Integration**: Works seamlessly with react-hook-form

## Usage

```tsx
import CountrySelectField from '@/components/commons/forms/CountrySelectField'
import { useForm } from 'react-hook-form'

const MyForm = () => {
  const { control, formState: { errors } } = useForm()
  
  return (
    <CountrySelectField 
      name="country"
      label="Country"
      placeholder="Select your country"
      control={control}
      error={errors.country}
      required
    />
  )
}
```

## Props

| Prop | Type | Description | Required |
|------|------|-------------|----------|
| `name` | `string` | Form field name | ✅ |
| `label` | `string` | Field label | ✅ |
| `placeholder` | `string` | Placeholder text | ✅ |
| `control` | `Control` | React Hook Form control | ✅ |
| `error` | `FieldError` | Form validation error | ❌ |
| `required` | `boolean` | Whether field is required | ❌ |

## Styling

The component uses a dark theme with the following color scheme:
- Background: `bg-gray-800/50` with backdrop blur
- Border: `border-gray-600` with focus states
- Text: `text-gray-200` with proper contrast
- Accent: `blue-500` for focus and selection states

## Dependencies

- `react-select-country-list` - Country data source
- `@radix-ui/react-popover` - Popover primitive
- `cmdk` - Command palette functionality
- `lucide-react` - Icons
- `react-hook-form` - Form management

## Browser Support

The flag emoji feature requires modern browser support for Unicode regional indicator symbols (supported in all modern browsers).