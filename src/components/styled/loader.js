import styled from 'vue-styled-components'
const loaderProps = { styles: Object, loaderClassName: String }

const StyledLoader = styled('div', loaderProps)`
  display: inline-block;
  position: relative;
  width: ${props => props.styles.size || '32px'};
  max-width: ${props => props.styles.size || '32px'};
  height: ${props => props.styles.size || '32px'};
  min-height: ${props => props.styles.size || '32px'};
    .${props => props.loaderClassName}__content {
    margin-top: 16px;
    margin-left: 22px;
    z-index: 10;
    width: 100%;
    height: 100%;
    font-family: Circe;
    font-size: 70px;
    line-height: 70px;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .text_glucometry {
        font-family: Roboto;
        font-style: normal;
        font-weight: 300;
        color: #464646;
        &_big {
            display: inline-flex
            font-size: 80px;
            line-height: 94px;
        }
        &_small {
            display: inline-flex
            font-size: 36px;
            line-height: 36px;
        }
    }
    .text_tonometry {
      color: #464646;
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      &_big {
        display: inline-flex
        font-size: 50px;
        line-height: 59px;
      }
      &_small {
        display: inline-flex
        font-size: 24px;
        line-height: 28px;
      }
    }    
    .wrapper {
      display: flex;
      &_tonometry {
        flex-direction: row;
        svg {
            width: 56px;
            height: 56px;
        }  
      }
      &_glucometry {
        flex-direction: row;
      }
    }
    ${props => props.styles.content}
  }
  & .${props => props.loaderClassName}__segment {
    position: absolute;
    top: ${props => props.styles.top || '0px'};
    left: ${props => props.styles.left || '0px'};
    width: ${props => props.styles.size || '32px'};
    height: ${props => props.styles.size || '32px'};
    margin: ${props => props.styles.margin || '32px'};
    border: ${props => props.styles.borderSize || '32px'} solid transparent;
    border-color: ${props => props.styles.borderColor || 'yellow'} transparent transparent transparent;
    border-radius: 50%;
    animation: loader-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    &:nth-child(1) {
      animation-delay: -0.45s;
    }
    &:nth-child(2) {
      animation-delay: -0.3s;
    }
    &:nth-child(3) {
      animation-delay: -0.15s;
    }
  } 
  
  @keyframes loader-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export default StyledLoader
