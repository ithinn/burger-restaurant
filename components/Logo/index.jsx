import Image from "next/image";
import Link from "next/link";
import { Box } from "reflexbox/styled-components"

export const Logo = () => {

    return(
        <Box >
            <Link href="/">
                <Image
                    src="/images/logo-01.png"
                    width={130}
                    height={150}
                    alt="logo"
                />
            </Link>
        </Box>
    )
}

export default Logo;