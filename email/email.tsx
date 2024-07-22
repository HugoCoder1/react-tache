import { Badge } from "@/components/ui/badge";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";
type Props = {
  message: string;
  name: string;
  priorite: string;
};
export const StripeWelcomeEmail = ({ message, name, priorite }: Props) => (
  <Html>
    <Head />
    <Preview>Vous etes prets pour recevoir votre liste des taches!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Hr style={hr} />
          <Text className="text-xl gap-x-4">Nom:{name}</Text>
          <Text className="text-2xl gap-x-4">Description:{message}</Text>

          <Hr style={hr} />
          <Text className="text-xl gap-x-2">
            Priorité:
            <Badge style={colorbadge}>{priorite}</Badge>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default StripeWelcomeEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  fontSize: "50px",
};
const colorbadge = {
  color: "blue",
};
const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const anchor = {
  color: "#556cd6",
};

const button = {
  backgroundColor: "#656ee8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
