// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {
//       typography: {
//         DEFAULT: {
//           css: {
//             color: '#fff',
//             a: {
//               color: '#8F2BC3',
//               '&:hover': {
//                 color: '#895DCA',
//               },
//             },
//           },
//         },
//       },
//     },
//   },
//   plugins: [
//     require('@tailwindcss/typography'),
//   ],
// };

import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#fff',
            a: {
              color: '#8F2BC3',
              '&:hover': {
                color: '#895DCA',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
};