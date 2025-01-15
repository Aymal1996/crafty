/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
			c_green :'#25B0B0',
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
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
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
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
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
  		},
		fontFamily:{
			Vietnam: ["var(--font-geist-sans)", "Be Vietnam Pro", "sans-serif"],
			Inter:["Inter", "serif"]
		},
		boxShadow: {
			neon: '0 0 8px 2px #00aaff, 0 0 12px 4px #0077cc',
			// 2: '0 -4px 8px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1)',
			// 2: '0 0 20px 10px rgba(0, 0, 0, 0.2)'
			2: '0px 1px 3px 0px #0000004d, 0px 4px 8px 3px #00000026'
		},
		backgroundImage:{
			banner1 : "url('/img/banner-imgae.png')",
			banner2 : "url('/img/banner-2.png')",
			banner3 : "url('/img/banner-3.png')",
			banner4: "url('/img/banner-4.png')",
			// banner5: "url('')",
			// banner6: "url('')",
		},
		keyframes: {
			growShadow: {
			  '0%': { boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)' },
			  '25%': { boxShadow: '0 0 3px 5px rgba(0, 0, 0, 0.1)' },
			  '50%': { boxShadow: '0 0 5px 5x rgba(0, 0, 0, 0.1)' },
			  '75%': { boxShadow: '0 0 15px 5px rgba(0, 0, 0, 0.1)' },
			  '100%': { boxShadow: '0 0 30px 5px rgba(0, 0, 0, 0.1)' },
			},
		  },
		  animation: {
			growShadow: 'growShadow 1.5s ease-in-out forwards',
		  },
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
