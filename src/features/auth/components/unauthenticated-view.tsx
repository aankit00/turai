import { ShieldAlertIcon} from "lucide-react";
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,

} from "@/components/ui/item";
import { SignInButton } from "@clerk/nextjs";

export const unauthenticatedView = () => {
    return (
        <div className= "flex items-center justify-center h-screen bg-background">

        <div className= "w-full max-w-lg bg-muted p-6 rounded-lg shadow-lg">
        <Item variant  ="outline">
            <ItemMedia>
                <ShieldAlertIcon/>
            </ItemMedia>
            <ItemContent>
                <ItemTitle>Unauthorized Access</ItemTitle>
                <ItemDescription>Please sign in to access this feature.</ItemDescription>
            </ItemContent>

        <ItemActions>
            <SignInButton variant="outline">
                Sign In
            </SignInButton>
        </ItemActions>
        </Item>

        </div>


        </div>
     );}