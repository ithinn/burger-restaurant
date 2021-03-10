
import FlexContainer from "../FlexContainer";
import Button from "../Button";

import {useForm, useFieldArray, Controller } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import {string, object} from "yup"

const schema = object().shape({
    
})

function MenuItem( {handleAdd, type, index, sizes} ) {

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
        

        <FlexContainer backgroundClr="white" flexHeight="10em" justify="space-around" align="center" direction="column" width="20em"  key={type}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h3>{type}</h3>
                            
                                <div>
                                    <input ref={register} type="hidden" name="title" value={type}/>
                                    <input ref={register} type="hidden" name="count" value="1"/>
                                    <label htmlFor="typeSize">Velg størrelse</label>
                                    <select name="size" ref={register}>
                                        {sizes.map(size => {
                                            return <option value={size}>{size}</option>
                                        })}
                                    </select>
                                </div>
                                
                                <Button btnColor="pink" id={"btn" + type + index}>Legg til</Button>
                            </form>        
        </FlexContainer>  
    )
}

export default MenuItem;