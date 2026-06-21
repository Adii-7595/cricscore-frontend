import { Box, Typography } from "@mui/material";

const EmptyState = ({ message }) => {

    return (

        <Box
            sx={{
                py: 8,
                textAlign: "center"
            }}
        >

            <Typography
                color="text.secondary"
            >

                {message}

            </Typography>

        </Box>

    );

};

export default EmptyState;