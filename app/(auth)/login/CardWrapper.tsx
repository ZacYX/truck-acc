// import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import Header from "./Header";
import { Card, CardFooter, CardHeader, CardBody } from "@nextui-org/card";
import Social from "./Social";
import BackButton from "./BackButton";


type CardWrapperProps = {
  children: React.ReactNode,
  headerLabel: string,
  backButtonLabel: string,
  backButtonHref: string,
  showSocial?: boolean,
}

export default function CardWrapper({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial
}: CardWrapperProps
) {
  return (
    <Card className="w-[400px] shadow-md py-4">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <BackButton
        href={backButtonHref}
        label={backButtonLabel} />
    </Card>
  )

}