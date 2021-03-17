import { Button } from "../StyledComponents/Button";
import { BlueH2, BlueH3, Paragraph } from "../StyledComponents/Headings"
import { useForm } from "react-hook-form";
import Image from "next/image"
import utilStyles from "../../styles/utils.module.css"
import { Select } from "../StyledComponents/Inputs";
import { Label, LabelAsButton } from "../StyledComponents/Labels";
import {Flex, Box} from "reflexbox"
import {Input, InvisibleCheckbox} from "../StyledComponents/Inputs";


export function MenuItem( {foodData, handleAdd, itemData, type, index, sizes, isLoggedIn} ) {
 
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
       
    })

    const onSubmit =async (data) =>  {
        handleAdd(data);
    }

    return (
        <Flex margin="1em" bg="white" height="auto" justifyContent="center" alignItems="space-between" flexDirection="column" as="article" width="17em">
            
            
            <Image
                src={itemData.image}
                height={200}
                width={300}
                className={utilStyles.courseImg}
                
            />

            <div>
                <BlueH2>{itemData.name}</BlueH2>
                <p>{itemData.description}</p>
                <BlueH3 clr="#a62d2d">{itemData.prices[0] + "/" + itemData.prices[1] + "/" + itemData.prices[2]},-</BlueH3>
            </div>
         
            <Flex width="100%" justifyContent="center" padding="1em" flexWrap="wrap">
                
                <form onSubmit={handleSubmit(onSubmit)}>
                           
                           <div>
                               <input ref={register} type="hidden" name="name" value={itemData.name}/>
                               <input ref={register} type="hidden" name="count" value="1"/>
                               <input ref={register} type="hidden" name="type" value={itemData.type}/>
                               <input ref={register} type="hidden" name="price" value={0}/>
                               <Label htmlFor="typeSize">Velg størrelse</Label>
                               <Select name="size" ref={register}>
                                   
                                   {itemData.sizes.map((size, i) => {
                         
                                       return <option value={[i, size]}>{size}</option>
                                   })}

                               </Select>
                               
 
                               <BlueH3 textAlign="left">Legg til (+15,-):</BlueH3>
                                {itemData.addOns !== undefined && (
                           
                           <Flex width="96%" flexWrap="wrap" height="8em" alignItems="flex-start">
                               
                               {itemData.addOns.map((addOn, index) => {
                                   return (
                                       <Box marginTop="1em" key={addOn + index}>
    
                                            <InvisibleCheckbox ref={register} type="checkbox" name={`addOns[${addOn}]`} defaultChecked={false} id={addOn}/>
                                            <LabelAsButton htmlFor={addOn}>{addOn}</LabelAsButton>
                                       </Box>
                                   )
                               })}
                           </Flex>
           
           
                           )}
           
           </div>   
                                           
                           {isLoggedIn && (<Button id={"btn" + itemData.name + index}>Legg til</Button>)}
                       </form>

            </Flex>
            

        </Flex>
        
    )
}

