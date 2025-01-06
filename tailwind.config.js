/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        grey: {
          btn: '#EAEAEA',
          cardBg:'#E6E6E6'
        },
        black: {
          btn: '#000000',
          banner: '#001628'
        },
        white: {
          btn: '#FFFFFF'
        },
        blue: {
          btn: '#1990FF',
          link:'#5EB1FF'
        },
        red: {
          btn: '#FF4D4F'
        },
        orange: {
          logIcon: '#FF4E50'
        }
      },
      fontSize: {
        'xxs': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
      },
      fontWeight: {
        'semi-bold': 600,
      },
    },
  },
  plugins: [],
}

