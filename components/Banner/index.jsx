import { SectionBase } from "../StyledComponents/Bases";

function Banner({children, bgImg }) {

    return(

        <SectionBase 
            bgImg={bgImg} 
            flexDirection="column" 
            width="100%" 
            height="50vh" 
            bgPosition="top">
        
            {children}
            
        </SectionBase>

    )
}

export default Banner;