const theme = {
    
    //Ta utgangspunkt i 8 og ha exppnelsiell vekst fra dette. 0.25=4 (siden basefontsize er 16)
    space: [
        0, '0.25rem', '0.5rem', '1rem', '2rem', '4rem'
    ], //spacing
    fontSizes: {
        lg: '3rem',
        md: '1.8rem',
        sm: '1.3rem',
        txt: "1rem"
        
    },
    fonts: {
        mainFont: "oswald",
        sectionHeading: 'gastromond',
        text: 'expo-serif-pro'
    },
    fontWeights: [
        0, 200, 400, 600, 900
    ],
    colors: {
        main: '#346f83',
        bg: "f9f9f8",
        gray: '#d1d1d1',
        red: '#a62d2d',
        black: '#333',
        brown: '#683928',
        overlay: "rgba(3, 3, 3, 0.3)"
        
    },
    letterSpacings: [
        0 , 1, 2, 3
    ],
    lineHeights: [
        1, 1.5, 2
    ],
    borders: {
        element: "2px solid #346f83",
        subElement: "2px solid #a62d2d",
        article: "4px solid #346f83",
        error: "2px solid red"
    },
    radii: {
        round: "50%"
    },
    shadows: {
        coloredHeading: "4px 5px 1px #103f3f",
        whiteHeading: "4px 5px 1px #d1d1d1"
    },
    zIndices: [
        0,1,2,3
    ],
    breakpoints: [
        '40em', '52em', '64em',
    ],
    sizes: {
        width: {
            menuItem: "20em"
        }
    },
    variants: {

        fgBox: {
            backgroundColor: "white",
            color: "main",
            border: "article",
            p: 2
        },
    
        bgBox: {
            bg: "gray",
            color: "main",
            border: "4px solid white",
            p: 2
        }
}}
   /* 
    export default {
        colors: {
          text: '#000',
          background: '#fff',
          primary: '#07c',
        },
        radii: {
          default: 4,
        },
        shadows: {
          card: '0 0 4px rgba(0, 0, 0, .125)',
        },

    variants: {
        card: {
          p: 3,
          borderRadius: 'default',
          bg: 'white',
          boxShadow: 'card',
        },
        badge: {
          color: 'white',
          bg: 'primary',
          p: 1,
          borderRadius: 'default',
        },
      },
      
}*/

export default theme;
/*

}*/