import { type TypographyProps } from "@mui/material";
import Typography from "@mui/material/Typography";

export const Paragraph = ({ children, ...props }: TypographyProps) => (
  <Typography
    variant="body1"
    lineHeight={1.8}
    color="text.primary"
    sx={{ whiteSpace: "pre-wrap", marginBottom: 2 }}
    {...props}
  >
    {children}
  </Typography>
);
