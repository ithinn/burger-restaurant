import {Flex} from "reflexbox";
import { NavBase } from "../StyledComponents/Bases";
import { Li } from "../StyledComponents/Lists";
import { Button } from "../StyledComponents/Button";
import { Link } from "next/link"
function UserNav() {
    return (
        <NavBase
            navWidth={[1, 1/2, 1/4]}
            navHeight="auto"
            position="absolute"
        >

        
           
            <Button>Logg ut</Button>
          

        </NavBase>
    )
}

export default UserNav;
/*
<Link href="/userStatus">
<a>Se dine ordre</a>
</Link>*/
