import { Container } from "@mui/material";

const PageContainer = ({ children }) => {

    return (

        <Container
            maxWidth="xl"
            sx={{
                py: 4
            }}
        >

            {children}

        </Container>

    );

};

export default PageContainer;