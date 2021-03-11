
import FlexContainer from "../FlexContainer";
import Button from "../Button";
import {StyledH3} from "../Headings"
import {useForm, useFieldArray, Controller } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import {string, object} from "yup"
import Image from "next/image"
import utilStyles from "../../styles/utils.module.css"
import styled from "styled-components";

const schema = object().shape({
    
})

const ImgBase = styled.div`
    height: 20em;
    width: 100%;
`

export const SelectBase = styled.select`
    font-size: 1rem;
    border: 2px solid #346f83;
    color: #346f83;
    font-family: "oswald";
`
export const SelectLabel = styled.label`
    font-size: 1rem;
    color: #346f83;
    font-family: "oswald";
    margin-right: 1em;
`










export function MenuItem( {handleAdd, type, index, sizes, isLoggedIn} ) {

    const {
        register, 
        handleSubmit, 
        reset, 
        watch, 
        formState: {isSubmitSuccessful}, 
        errors} = useForm({
        mode: "onChange",
        defaultValues: {
           
        },
        resolver: yupResolver(schema)
    })

    const onSubmit =async (data) =>  {
        handleAdd(data);
    }

  
    return (
        

        <FlexContainer backgroundClr="white" flexHeight="auto" justify="center" align="center" direction="column" flexWidth="15em" key={type}>
                            
                            <Image
                                    src="/images/soyaburger.jpg"
                                    height={200}
                                    width={300}
                                    className={utilStyles.courseImg}
                                />
                                <StyledH3>{type}</StyledH3>
                                <p>Beskrivelse beskrivelse beskrivelse</p>
                            
                                    
                    
                            <form onSubmit={handleSubmit(onSubmit)}>
                                
                                <div>
                                    <input ref={register} type="hidden" name="title" value={type}/>
                                    <input ref={register} type="hidden" name="count" value="1"/>
                                    <SelectLabel htmlFor="typeSize">Velg størrelse</SelectLabel>
                                    <SelectBase name="size" ref={register}>
                                        {sizes.map(size => {
                                            return <option value={size}>{size}</option>
                                        })}
                                    </SelectBase>
                                </div>
                                
                                {isLoggedIn && (<Button btnBorder="none" txtColor="white" btnColor="#346f83" id={"btn" + type + index}>Legg til</Button>)}
                            </form>        
        </FlexContainer>  
    )
}

