import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner = () => {

    return (

        <Box
            sx={{
                py: 8,
                display: "flex",
                justifyContent: "center"
            }}
        >

            <CircularProgress />

        </Box>

    );

};

export default LoadingSpinner;