import { extendTheme, theme as base, withDefaultVariant } from "@chakra-ui/react"

const breakpoints = {
  sm: '320px',
  md: '500px',
  lg: '720px',
  xl: '960px',
  '2xl': '1200px',
}

export const theme = extendTheme({
  breakpoints, 
  fonts: {
    heading: `'Roboto Slab', ${base.fonts.heading}`,
    body: `'Montserrat', sans-serif`,
  },
  styles: {
    global: {
        body: {
           /** bg: 'gray.50'*/ 
           /**bgGradient: 'linear(to-r, teal.100, blue.200)' */ 
           /*bgGradient: 'linear(to-r, gray.300, blueGray.500, gray.500)'*/
          /**bgGradient: 'linear(to-r, gray.100, gray.400)' */ 
          bgGradient:'linear(to-r, gray.200,blue.100 )'
        }
    }
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'teal', // default is gray
      }
    },
    Input:{
      defaultProps: {
        focusBorderColor: 'pink.500'
      }
    },
    Select:{
      baseStyle: {
        _focus: {
          borderColor: 'pink.500'
        }
      }
    },
    Textarea:{
      defaultProps: {
        focusBorderColor: 'pink.300'
      }
    }
  }
});