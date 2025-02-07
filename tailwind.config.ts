import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Prend en charge les fichiers dans le dossier "app"
    "./pages/**/*.{js,ts,jsx,tsx}", // Prend en charge les fichiers dans le dossier "pages"
    "./components/**/*.{js,ts,jsx,tsx}", // Prend en charge les fichiers dans le dossier "components"
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			'surface-background': 'var(--surface-background)',
  			'surface-primary': 'var(--surface-primary)',
  			'surface-secondary': 'var(--surface-secondary)',
  			'surface-secondary-hover': 'var(--surface-secondary-hover)',
  			'surface-brand': 'var(--surface-brand)',
  			'surface-brand-hover': 'var(--surface-brand-hover)',
  			'surface-brand-highlights': 'var(--surface-brand-highlights)',
  			'surface-popup': 'var(--surface-popup)',
  			'border-primary': 'var(--border-primary)',
  			'border-secondary': 'var(--border-secondary)',
  			'border-brand': 'var(--border-brand)',
  			'icones-primary': 'var(--icones-primary)',
  			'icones-brand': 'var(--icones-brand)',
  			'icones-negatif': 'var(--icones-negatif)',
  			'icones-white': 'var(--icones-white)',
  			white: 'var(--text-white)',
  			brand: 'var(--text-brand)',
  			primary: 'var(--text-primary)',
  			negatif: 'var(--text-negatif)',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
