
import FlexContainer from "../FlexContainer";
import Button from "../StyledComponents/Button";
import { BlueH3 } from "../StyledComponents/Headings"
import {useForm, useFieldArray, Controller } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import {string, object} from "yup"
import Image from "next/image"
import utilStyles from "../../styles/utils.module.css"
import styled from "styled-components";
import { Select } from "../StyledComponents/Inputs";
import { Label } from "../StyledComponents/Labels";
import {Flex, Box} from "reflexbox"


const schema = object().shape({
    
})

const ImgBase = styled.div`
    height: 20em;
    width: 100%;
`


export function MenuItem( {handleAdd, itemData, type, index, sizes, isLoggedIn} ) {

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
        <Flex height="auto" justifyContent="center" alignItems="center" flexDirection="column" width="15em">
            <Image
                src={itemData.image}
                height={200}
                width={300}
                className={utilStyles.courseImg}
            />

            <BlueH3>{itemData.name}</BlueH3>
            <p>{itemData.description}</p>
            <p>{itemData.prices[0] + "/" + itemData.prices[1] + "/" + itemData.prices[2]}</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                           
                <div>
                    <input ref={register} type="hidden" name="title" value={itemData.name}/>
                    <input ref={register} type="hidden" name="count" value="1"/>
                    <Label htmlFor="typeSize">Velg størrelse</Label>
                    <Select name="size" ref={register}>
                        {itemData.sizes.map(size => {
                            return <option value={size}>{size}</option>
                        })}
                    </Select>
                
                
                {itemData.addOns !== undefined && (
                <Flex flexWrap={true}>
                    {itemData.addOns.map((addOn, index) => {
                        return (
                            <div key={addOn + index}>
                            <label htmlFor={addOn}>{addOn}</label>
                            <input ref={register} type="checkbox" name={addOn} defaultChecked={false} id={addOn}/>
                            </div>
                        )
                    })}
                </Flex>


                )}

</div>   
                                
                {isLoggedIn && (<Button btnBorder="none" txtColor="white" btnColor="#346f83" id={"btn" + itemData.name + index}>Legg til</Button>)}
            </form>

        </Flex>
        
    )


/*
  
    return (
        
        <FlexContainer backgroundClr="white" flexHeight="auto" justify="center" align="center" direction="column" flexWidth="15em" key={type}>
                            
                            <Image
                                    src="/images/soyaburger.jpg"
                                    height={200}
                                    width={300}
                                    className={utilStyles.courseImg}
                                />

                            <BlueH3>{type}</BlueH3>
                            <p>Beskrivelse beskrivelse beskrivelse</p>
                            
                                    
                        
                            <form onSubmit={handleSubmit(onSubmit)}>
                                
                                <div>
                                    <input ref={register} type="hidden" name="title" value={type}/>
                                    <input ref={register} type="hidden" name="count" value="1"/>
                                    <Label htmlFor="typeSize">Velg størrelse</Label>
                                    <Select name="size" ref={register}>
                                        {sizes.map(size => {
                                            return <option value={size}>{size}</option>
                                        })}
                                    </Select>
                                </div>
                                
                                {isLoggedIn && (<Button btnBorder="none" txtColor="white" btnColor="#346f83" id={"btn" + type + index}>Legg til</Button>)}
                            </form>        
        </FlexContainer>  
    )*/
}

