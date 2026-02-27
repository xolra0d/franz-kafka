import { type TypographyProps } from "@mui/material";
import Typography from "@mui/material/Typography";

export const Title = ({ children, ...props }: TypographyProps) => (
  <Typography variant="h4" marginTop={2} {...props}>
    {children}
  </Typography>
);
