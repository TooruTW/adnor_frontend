import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

/**
 * 以 Aura 為基底的黑白灰階主題；色票為 16 進位，與舊有 Tailwind 語意色對齊。
 */
export const auraThemePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{zinc.50}',
      100: '{zinc.100}',
      200: '{zinc.200}',
      300: '{zinc.300}',
      400: '{zinc.400}',
      500: '{zinc.500}',
      600: '{zinc.600}',
      700: '{zinc.700}',
      800: '{zinc.800}',
      900: '{zinc.900}',
      950: '{zinc.950}',
    },
    focusRing: {
      width: '2px',
      style: 'solid',
      color: '{primary.color}',
      offset: '2px',
      shadow: 'none',
    },
    colorScheme: {
      light: {
        surface: {
          0: '#fafafa',
          50: '#f5f5f5',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        primary: {
          color: '#171717',
          contrastColor: '#fafafa',
          hoverColor: '#262626',
          activeColor: '#404040',
        },
        highlight: {
          background: '#f5f5f5',
          focusBackground: '#e5e5e5',
          color: '#171717',
          focusColor: '#171717',
        },
        content: {
          background: '{surface.0}',
          hoverBackground: '{surface.50}',
          borderColor: '{surface.200}',
        },
        text: {
          color: '{surface.900}',
          hoverColor: '{surface.950}',
          mutedColor: '{surface.500}',
          hoverMutedColor: '{surface.600}',
        },
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        primary: {
          color: '#fafafa',
          contrastColor: '#171717',
          hoverColor: '#f5f5f5',
          activeColor: '#e5e5e5',
        },
        highlight: {
          background: 'rgba(250, 250, 250, 0.16)',
          focusBackground: 'rgba(250, 250, 250, 0.24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
        content: {
          background: '{surface.900}',
          hoverBackground: '{surface.800}',
          borderColor: '{surface.700}',
        },
        text: {
          color: '{surface.0}',
          hoverColor: '{surface.0}',
          mutedColor: '{surface.400}',
          hoverMutedColor: '{surface.300}',
        },
      },
    },
  },
})
