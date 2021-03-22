//-----------------------------------------------------------React/next
import { useForm } from "react-hook-form";
import Image from "next/image"
//-----------------------------------------------------------Components/Style
import utilStyles from "../../styles/utils.module.css"
import { Select } from "../StyledComponents/Inputs";
import { Label, LabelAsButton } from "../StyledComponents/Labels";
import { Flex, Box } from "reflexbox/styled-components"
import { InvisibleCheckbox } from "../StyledComponents/Inputs";
import { Button } from "../StyledComponents/Button";
import { BlueH2, BlueH3, Pa } from "../StyledComponents/Headings"


export function MenuItem( {index, isLoggedIn, handleAdd, itemData, sizes} ) {
 
    const {
        register, 
        handleSubmit,  
        formState: {isSubmitSuccessful}, 
        errors} = useForm({
        mode: "onChange",
        })


    const onSubmit =async (data) =>  {
        handleAdd(data);
    }


    return (
        <Flex 
            variant="card" 
            height="auto" 
            justifyContent="center" 
            alignItems="space-between" 
            p={0} 
            flexDirection="column" 
            as="article" 
            width="17em">
            
            <Image
                src={itemData.image}
                height={200}
                width={300}
                className={utilStyles.courseImg}
            />

            <div>
                <BlueH2>{itemData.name}</BlueH2>
                <Pa>{itemData.description}</Pa>
                <BlueH3 clr="#a62d2d">
                        {itemData.prices[0] + "/" + itemData.prices[1] + "/" + itemData.prices[2]},-
                </BlueH3>
            </div>
         
            <Flex 
                width="100%" 
                justifyContent="center" 
                padding="1em" 
                >
                
                <form onSubmit={handleSubmit(onSubmit)}>
                           
                    <div>
                        <input ref={register} type="hidden" name="name" value={itemData.name}/>
                        <input ref={register} type="hidden" name="count" value="1"/>
                        <input ref={register} type="hidden" name="type" value={itemData.type}/>
                        <input ref={register} type="hidden" name="price" value={0}/>
                        <Label htmlFor="typeSize">Velg størrelse:</Label>
                        <Select name="size" ref={register}>
    
                            {itemData.sizes.map((size, i) => {
                               return <option key={size} value={[i, size]}>{size}</option>
                            })}

                        </Select>
                                
                        {itemData.addOns !== undefined && (
                        <>
                        <BlueH3 textAlign="left">Legg til (+15,-):</BlueH3>
                        
                        <Box 
                            as="article" 
                            width="fit-content"
                            height="auto"
                            >
                               
                            {itemData.addOns.map((addOn, index) => {
                               return (
                                   <Box key={addOn + index}>
                                        <InvisibleCheckbox 
                                            ref={register} 
                                            type="checkbox" 
                                            name={`addOns[${addOn}]`} 
                                            defaultChecked={false} 
                                            id={itemData.type + addOn}/>

                                        <LabelAsButton htmlFor={itemData.type + addOn}>
                                            {addOn}
                                        </LabelAsButton>
                                   </Box>
                               )
                            })}
                        </Box>
                        </>
                        )}
                    </div>   
                                           
                    {isLoggedIn && (
                    <Button id={"btn" + itemData.name + index}>Legg til</Button>)}

                </form>
            </Flex>
        </Flex>  
    )
}

