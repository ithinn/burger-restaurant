const theme = {
    
    //Ta utgangspunkt i 8 og ha exppnelsiell vekst fra dette. 0.25=4 (siden basefontsize er 16)
    space: [0, '0.25rem', '0.5rem', '1rem', '2rem', '4rem'], //spacing
    
    breakpoints: [
        '40em', '52em', '64em',
      ],
    fontSizes: {
        lg: '3rem',
        md: '1.8rem',
        sm: '1.3rem'
    },
    colors: {
        blue: '#346f83',
        gray: '#d1d1d1',
        red: '#a62d2d',
        black: '#3e3b14',
        brown: '#683928'
    },

      
    variants: {
        card: {
          
            borderRadius: "50%",
            bg: "red",
            boxShadow: "card",
        },
        badge: {
            color: "blue",
            bg: "pink",
            p: 1,
            borderRadius: "10px"

        }
    }

}

export default theme;