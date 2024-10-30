const color = require('@k-vyn/coloralgorithm')

// biome-ignore format: we don't want to format the keys
const keys = ['50','100','200','300','400','500','600','700','800','900','950']

const props = {
  'properties': {
    'steps': 9,
    'hue': {
      'start': 190,
      'end': 200,
      'curve': 'easeInQuad',
    },
    'saturation': {
      'start': 0.1,
      'end': 1,
      'rate': 1,
      'curve': 'easeOutQuad',
    },
    'brightness': {
      'start': 0.99,
      'end': 0.7,
      'curve': 'linear',
    },
  },
  'options': {
    'minorSteps': [0, 1],
    'name': 'Blue',
    'provideInverted': false,
    'rotation': 'clockwise',
  },
}

const colors = color.generate(props.properties, props.options)
const blue = Object.fromEntries(
  colors[0].colors.map(({ hex }, i) => {
    return [keys[i], hex]
  }),
)

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './index.html', './.storybook/**/*'],
  theme: {
    fontFamily: {
      sans: ['DM Sans Variable'],
      mono: [
        'source-code-pro',
        'Menlo',
        'Monaco',
        'Consolas',
        'Courier New',
        'monospace',
      ],
    },

    extend: {
      colors: {
        blue,
      },
    },
  },
  plugins: [],
}
