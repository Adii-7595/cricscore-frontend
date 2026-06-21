import {
    Box,
    Button
} from "@mui/material";

const tabs = [

    { label: "Live", icon: "🔴", value: "live" },

    { label: "Upcoming", icon: "⏳", value: "upcoming" },

    { label: "Recent", icon: "✅", value: "completed" }

];

const MatchTabs = ({ status, onChange }) => {

    return (

        <Box

            sx={{

                display: "grid",

                gridTemplateColumns: {

                    xs: "repeat(3, 1fr)",

                    sm: "repeat(3, minmax(0,1fr))"

                },

                gap: { xs: 1, sm: 1.5 },

                mt: { xs: 2, md: 3 },

                mb: { xs: 2, md: 3 }

            }}

        >

            {tabs.map((tab) => {

                const active = status === tab.value;

                return (

                    <Button

                        key={tab.value}

                        onClick={() => onChange(tab.value)}

                        disableRipple

                        sx={{

                            py: { xs: 1, sm: 1.4 },

                            px: { xs: .5, sm: 2 },

                            borderRadius: 2,

                            fontWeight: 600,

                            fontSize: { xs: ".78rem", sm: ".9rem" },

                            textTransform: "none",

                            gap: { xs: .4, sm: .75 },

                            border: "1px solid",

                            borderColor: active

                                ? "#3B82F6"

                                : "rgba(148,163,184,.16)",

                            bgcolor: active

                                ? "rgba(59,130,246,.12)"

                                : "transparent",

                            color: active ? "#93C5FD" : "#94A3B8",

                            transition: "border-color .15s, background-color .15s",

                            "&:hover": {

                                bgcolor: active

                                    ? "rgba(59,130,246,.16)"

                                    : "rgba(148,163,184,.06)",

                                borderColor: active

                                    ? "#3B82F6"

                                    : "rgba(148,163,184,.3)"

                            }

                        }}

                    >

                        <span aria-hidden="true">{tab.icon}</span>

                        {tab.label}

                    </Button>

                );

            })}

        </Box>

    );

};

export default MatchTabs;