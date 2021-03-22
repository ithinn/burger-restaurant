import styled from "styled-components"
import { Box} from "reflexbox/styled-components"

const ButtonBase = styled(Box)`
    border: ${props => props.theme.borders.element};
    text-transform: uppercase;

    &:hover {
        color: ${props => props.hoverClr};
        background-color: ${props => props.hoverBg};
        border: 2px solid white;
    }

    &:active {
        background-color: white;
        color: ${props => props.theme.colors.main}
    }
`

ButtonBase.defaultProps = {
    color: "white",
    bg: "main",
    as: "button",
    margin: 3,
    fontSize: "sm",
    fontFamily: "mainFont",
    p: [1,2],
    hoverClr: "white",
    hoverBg: "rgba(0, 0, 0, .5)"
}

export function Button({ handleClick, children, id, ...rest }) {
    return (
        <ButtonBase 
        onClick={handleClick}
        id={id}
        {...rest}
        >
            { children }
        </ButtonBase>
    )
}

const RoundBtnBase = styled(Box)`
    border: ${props => props.theme.borders.element};
    border-radius: ${props => props.theme.radii.round};
    position: ${props => props.position};
    display: flex;
    justify-content: center;
    align-items: center;
 
    &:hover {
        color: white;
        background: ${props => props.theme.colors.main};

    }
`

RoundBtnBase.defaultProps = {
    position: "none",
    width: "60px",
    height: "60px",
    color: "main",
    bg: "rgba(255, 255, 255, 0.5)",
    p: 1
}

export function RoundBtn({ handleClick, children, ...rest }) {
    return (
        <RoundBtnBase 
        onClick={handleClick}
        {...rest}
        >
            { children }
        </RoundBtnBase>
    )

}



